import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Category } from 'src/category/category.schema';
import * as mongoose from 'mongoose';
import { Rating } from 'src/rating/rating.schema';

@Schema({
  timestamps: true,
})
export class User {
    @Prop()
    name: string;

    @Prop({ unique: true })
    email: string;

    @Prop()
    password: string;

    @Prop()
    address: string;
    
    @Prop()
    dob: Date;

    @Prop({ type:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category'}] })
    categories: Category[];

    @Prop({ type:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rating'}] })
    ratings: Rating[];

}

export const UserSchema = SchemaFactory.createForClass(User);
