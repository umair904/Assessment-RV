import { IsMongoId, MaxLength, MinLength } from "class-validator";

export class CreateRatingDto {

 @IsMongoId({message: 'Provide Valid Object Id' })
 user: string;
 
 @IsMongoId({message: 'Provide Valid Object Id' })
 movie: string;

 ratingValue: number;
}