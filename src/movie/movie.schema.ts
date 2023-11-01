import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Category } from '../category/category.schema';
import { Rating } from '../rating/rating.schema';

@Schema({
  timestamps: true,
})
export class Movie {
    @Prop()
    name: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
    category: Category;

    @Prop({ type:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rating'}] })
    ratings: Rating[];
}

export const MovieSchema = SchemaFactory.createForClass(Movie);

