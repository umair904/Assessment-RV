import { Injectable } from '@nestjs/common';
import { Category } from './category.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel(Category.name) private categoryModel: mongoose.Model<Category>,
    ){}

    async getAllcategories(){
        return await this.categoryModel.find();
    }

}
