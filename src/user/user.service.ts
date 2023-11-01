import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt'
import { User } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { LogInDto } from './dto/login-user.dto';
import { ChangePassDto } from './dto/changePass-user.dto';
import { UpdateUserDto } from './dto/updateData-user.dto';
import { AddCategoriesToUserDto } from './dto/addCategoriesToUser.dto';
import { CategoryService } from '../category/category.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: mongoose.Model<User>,
    private categoryService: CategoryService
  ){}

  
  async signUp(signUpData: CreateUserDto) {
    // I have used bcrypt library to encode passwords for security purpose
    const hashedPassword = await bcrypt.hash(signUpData.password, 10);
    try {
      return await this.userModel.create({
        ...signUpData,
        password: hashedPassword,
      });
    } catch (error) {
      // Below is the error code {11000} for duplicate entry {found using ChatGpt}
      if (error?.code === 11000) {
        throw new HttpException(
          'Email Already Exists in Database',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something Went Wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login(logInDto: LogInDto) {
      const user = await this.userModel.findOne({'email':logInDto.email});
      if(!user){
        throw new HttpException(
            'User not found',
            HttpStatus.BAD_REQUEST,
        );
      }
      // Below I am comparing the password provided by user to login with the encrypted password in DB with the help of compare method provided by bcrypt 
      const checkpass = await bcrypt.compare(logInDto.password,user.password)
      if(checkpass){
        return user;
      }else{
        throw new HttpException(
            'Wrong Credentials',
            HttpStatus.BAD_REQUEST,
        );
      }
  }

  async changePass(changePassDto: ChangePassDto){
    const user = await this.userModel.findOne({'email':changePassDto.email});
      if(!user){
        throw new HttpException(
            'User not found',
            HttpStatus.BAD_REQUEST,
        );
      }
      if (!await bcrypt.compare(changePassDto.currentPassword,user.password)){
        throw new HttpException(
            'Wrong Current Password',
            HttpStatus.BAD_REQUEST,
        );
      }
      user.password = await bcrypt.hash(changePassDto.newPassword, 10);
      await user.save();
      return{
        message: "Password Changed Successfully"
      }
  }

  async updateInfo(updateUserDto : UpdateUserDto){
    const user = await this.userModel.findOne({'email':updateUserDto.email});
      if(!user){
        throw new HttpException(
            'User not found',
            HttpStatus.BAD_REQUEST,
        );
      }
    if (updateUserDto.address){
      user.address = updateUserDto.address
    }
    if (updateUserDto.name){
      user.name = updateUserDto.name
    }
    if (updateUserDto.dob){
      user.dob = updateUserDto.dob
    }
    await user.save();
    return {
      message:'User Info Updated'
    }
  }

  async getUserByEmail(email : string){
    const user = await this.userModel.findOne({'email':email}).populate("ratings");
      if(!user){
        throw new HttpException(
            'User not found',
            HttpStatus.BAD_REQUEST,
        );
      }
    return user
  }

  async getUserById(id){
    const user = await this.userModel.findById(id).populate("ratings")
      if(!user){
        throw new HttpException(
            'User not found',
            HttpStatus.BAD_REQUEST,
        );
      }
    return user
  }

  /**
   * In below API, First I am fetching the User 
   * then I am fatching the categories objects from DB 
   * then I am filteing the categories ids given by user again even though the objects against those Ids are already linked to their(user) object
   * then after I get the unique ids to link the categories object against those ids to the user
   * I filterd the Objects against those ids
   * And pushed them (desturctured) into the categories array of user object so all of them can be linked individually to the user object
   */
  
  async updateUserCategories(addCategoriesToUserDto : AddCategoriesToUserDto) {
    // Finding User
    const user = await this.userModel.findById(addCategoriesToUserDto.user);
    if (!user) {
      throw new Error('User not found');
    }
    // Getting Categories from DB
    const categoryObjects = await this.categoryService.getAllcategories();
    let newCategories;
    // Condition for the users those have categories added so there is a chances of redunduncy
    if(user.categories.length > 0){
      // Below code will filter the ids and return only unique ids among the ids provided to be linked
      newCategories = addCategoriesToUserDto.categories.filter((category) => {
        return !user.categories.some((existingCategory) => (existingCategory as any)._id.equals(category));
    });
    }else{
      // for new users those dont have any catageories selected yet, all of the provided will be considered good to go with
      newCategories = addCategoriesToUserDto.categories
    }
      // Below code will then get the objects against those ids
    const filteredArray = categoryObjects.filter((item) => newCategories.includes(item._id.toString()));
    user.categories.push(...filteredArray);
    await user.save();
  }

  async removeUserCategories(removeCategoriesFromUserDto : AddCategoriesToUserDto) {
    const user = await this.userModel.findById(removeCategoriesFromUserDto.user);
    if (!user) {
      throw new Error('User not found');
    }
    // Below code is removing the categories from user profile, those are provided by the user
    const newArray2 = user.categories.filter((item) => !removeCategoriesFromUserDto.categories.includes((item as any)._id.toString()));
    user.categories = newArray2
    await user.save();
  }

}
