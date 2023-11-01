import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LogInDto } from './dto/login-user.dto';
import { ChangePassDto } from './dto/changePass-user.dto';
import { UpdateUserDto } from './dto/updateData-user.dto';
import { AddCategoriesToUserDto } from './dto/addCategoriesToUser.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @Post('signUp')
    async userSignUp(@Body() signUpData:CreateUserDto) {
      return this.userService.signUp(signUpData);
    }

    @Post('logIn')
    async userLogIn(@Body() logInData:LogInDto) {
      return this.userService.login(logInData);
    }

    @Post('changePassword')
    async changeUserPass(@Body() changePassData:ChangePassDto) {
      return this.userService.changePass(changePassData);
    }

    @Put('updateUser')
    async updateUserInfo(@Body() updateUserInfoData: UpdateUserDto){
      return this.userService.updateInfo(updateUserInfoData);
    }

    @Get('getUser')
    async getUserByEmail(@Body() data) {
      return this.userService.getUserByEmail(data.email);
    }

    @Post('addCategoriesToUser')
    async addUserCategories(
      @Body() addCategoriesDto: AddCategoriesToUserDto,
    ) {
      try {
        await this.userService.updateUserCategories(addCategoriesDto);
        return { message: 'Categories added/updated for the user successfully' };
      } catch (error) {
        return { error: error.message };
      }
    }

    @Post('removeCategoriesFromUser')
    async removeCategoriesFromUser(
      @Body() removeCategoriesDto: AddCategoriesToUserDto,
    ) {
      try {
        await this.userService.removeUserCategories(removeCategoriesDto);
        return { message: 'Categories removed for the user successfully' };
      } catch (error) {
        return { error: error.message };
      }
    }
  
}
