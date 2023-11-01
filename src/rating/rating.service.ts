import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateRatingDto } from './dto/addRating.dto';
import * as mongoose from 'mongoose';
import { Rating } from './rating.schema';

@Injectable()
export class RatingService {
    constructor(@InjectModel(Rating.name) private readonly ratingModel: mongoose.Model<Rating>) {}

  async createRating(createRatingDto: CreateRatingDto): Promise<Rating> {
    const rating = new this.ratingModel(createRatingDto);
    return rating.save();
  }
}
