import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Movie } from '../movie/movie.schema';
import { User } from '../user/user.schema';


@Schema({
  timestamps: true,
})
export class Rating {

    @Prop()
    ratingValue: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' })
    movie: Movie;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;
    
}

export const RatingSchema = SchemaFactory.createForClass(Rating);

