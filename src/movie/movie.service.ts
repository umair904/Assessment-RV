import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Movie } from './movie.schema';
import * as mongoose from 'mongoose';
import { UserService } from '../user/user.service';

@Injectable()
export class MovieService {
    constructor(
        @InjectModel(Movie.name) private movieModel: mongoose.Model<Movie>,
        private userService: UserService
    ){}

    async getAllMovies(){
        return await this.movieModel.find();
    }

    async getMovieById(id){
      const movie = await this.movieModel.findById(id)
      if(!movie){
        throw new HttpException(
            'movie not found',
            HttpStatus.BAD_REQUEST,
        );
      }
    return movie
    }

    /**
     *  Below is the busniess logic that will grab a user form DB along with his/her selected Catagories
     *  if exists, and then search for the top rated movies from those categories to recommend the logged in user 
     */

    async getRecommendedMoviesForUser(userId : string){
        let user = await this.userService.getUserById(userId)
        if(!user){
            throw new Error('User not found');
        }
        const recommendedMovies = await this.movieModel
        .aggregate([
          {
            $match: {
              'category': { $in: user.categories },
            },
          },
          {
            $lookup: {
              from: 'ratings',
              localField: '_id',
              foreignField: 'movie',
              as: 'ratings',
            },
          },
          {
            $project: {
              name: 1,
              category: 1,
              averageRating: {
                $avg: '$ratings.ratingValue',
              },
            },
          },
          {
            $sort: {
              averageRating: -1,
            },
          },
          {
            $limit: 10,
          },
        ])
        .exec();
  
        return recommendedMovies
    }
}
