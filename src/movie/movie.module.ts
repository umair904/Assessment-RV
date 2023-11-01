import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieSchema } from './movie.schema';
import { UserModule } from '../user/user.module';

@Module({
  imports:[MongooseModule.forFeature([{name: 'Movie', schema: MovieSchema}]), UserModule],
  controllers: [MovieController],
  providers: [MovieService],
  exports: [MovieService]
})
export class MovieModule {}
