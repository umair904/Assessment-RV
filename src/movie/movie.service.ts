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
     *  if exists, and then search for the movies from those categories to recommend the logged in user 
     */

    async getRecommendedMoviesForUser(userId : string){
        let user = await this.userService.getUserById(userId)
        if(!user){
            throw new Error('User not found');
        }
        // Below code is used for fetching the objects ids from the objects to use them for searching using {$in}
        let categoryIdsArray = user.categories.map((category) => (category as any)._id);
        const movies = await this.movieModel
        .find({ category: { $in: categoryIdsArray } })
        .populate('category')
        .exec();
        return movies
    }
}
