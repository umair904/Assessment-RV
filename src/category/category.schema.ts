import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Movie } from '../movie/movie.schema';


@Schema({
  timestamps: true,
})
export class Category {
    @Prop()
    name: string;

    @Prop({ type:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}] })
    movies: Movie[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);

