import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './category/category.schema';
import { Movie } from './movie/movie.schema';


@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<Movie>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async seedData() {
    const movieCount = await this.movieModel.countDocuments();
    const categoryCount = await this.categoryModel.countDocuments();

    if (movieCount > 0 || categoryCount > 0) {
      console.log('Data already seeded. Skipping the seeding process.');
      return;
    }

    const actionCategory = await this.categoryModel.create({ name: 'Action' });
    const comedyCategory = await this.categoryModel.create({ name: 'Comedy' });
    const horrorCategory = await this.categoryModel.create({ name: 'Horror' });
    const animatedCategory = await this.categoryModel.create({ name: 'Animated' });

    const movie1 = await this.movieModel.create({ name: 'Avengers : Infinity War', category: actionCategory._id });
    const movie2 = await this.movieModel.create({ name: 'John Wick : 3', category: actionCategory._id });
    const movie3 = await this.movieModel.create({ name: 'Rush Hour', category: comedyCategory._id });
    const movie4 = await this.movieModel.create({ name: 'The Dictator', category: comedyCategory._id });
    const movie5 = await this.movieModel.create({ name: 'Conjuring', category: horrorCategory._id });
    const movie6 = await this.movieModel.create({ name: 'Incidious', category: horrorCategory._id });
    const movie7 = await this.movieModel.create({ name: 'Kung Fu Panda', category: animatedCategory._id });
    const movie8 = await this.movieModel.create({ name: 'Ice Age', category: animatedCategory._id });
    

    actionCategory.movies = [movie1, movie2];
    comedyCategory.movies = [movie3, movie4];
    horrorCategory.movies = [movie5, movie6];
    animatedCategory.movies = [movie7, movie8]

    await actionCategory.save();
    await comedyCategory.save();
    await horrorCategory.save();
    await animatedCategory.save();
  }
}