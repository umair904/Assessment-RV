import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieModule } from './movie/movie.module';
import { CategoryModule } from './category/category.module';
import { RatingModule } from './rating/rating.module';
import { SeedService } from './datebase.seeding';
import { MovieSchema } from './movie/movie.schema';
import { CategorySchema } from './category/category.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
  }),
  MongooseModule.forRoot(process.env.DB_URI),    
  MongooseModule.forFeature([{ name: 'Movie', schema: MovieSchema }]),
  MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
  UserModule,
  MovieModule,
  CategoryModule,
  RatingModule,
],
  controllers: [AppController],
  providers: [AppService, SeedService],
})
export class AppModule {}
