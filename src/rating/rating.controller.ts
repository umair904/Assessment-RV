import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/addRating.dto';
import { MovieService } from '../movie/movie.service';
import { UserService } from '../user/user.service';

@Controller('rating')
export class RatingController {

    constructor(
        private readonly ratingsService: RatingService,
        private readonly moviesService: MovieService,
        private readonly usersService: UserService,
      ) {}
    

    @Post('addRating')
    async createRating(@Body() createRatingDto: CreateRatingDto) {
       /**
        * Below we are fetching movie and user objects form DB so after adding the rating
        * we will link rating object to movie and user object using mongoose Type Id
        */ 
      const movie = await this.moviesService.getMovieById(createRatingDto.movie);
      const user = await this.usersService.getUserById(createRatingDto.user);
      if(!movie){
        throw new HttpException(
            'Movie Not Found',
            HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      if(!user){
        throw new HttpException(
            'User Not Found',
            HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      const rating = await this.ratingsService.createRating(createRatingDto);
  
      // After the rating is stored in our DB, This code below is adding the rating in movie object's rating array 
      movie.ratings.push((rating as any)._id);
      await movie.save();
  
      // Adding rating to the user object in database
      user.ratings.push((rating as any)._id);
      await user.save();
  
      return rating;
    }
}
