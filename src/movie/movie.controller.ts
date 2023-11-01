import { Controller, Get, Param } from '@nestjs/common';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
    constructor(private movieService: MovieService){}

    @Get('getAllMovies')
    async getAllMovies() {
      return this.movieService.getAllMovies();
    }

    @Get('getRecommendedMoviesForUser/:user')
    async getRecommendedMoviesForUser(@Param('user') recommendedMoviesForUserDTO : string) {
      return this.movieService.getRecommendedMoviesForUser(recommendedMoviesForUserDTO);
    }
}
