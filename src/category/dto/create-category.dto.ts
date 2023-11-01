import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @IsEmail()
  name: string;
}

