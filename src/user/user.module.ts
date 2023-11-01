import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserSchema } from './user.schema';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports:[MongooseModule.forFeature([{name: 'User', schema: UserSchema}]), CategoryModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
