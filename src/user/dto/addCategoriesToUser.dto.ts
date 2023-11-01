import { ArrayNotEmpty, IsArray, IsMongoId, MaxLength, MinLength, ValidateNested } from "class-validator";

export class AddCategoriesToUserDto {

 @IsMongoId({message: 'Provide Valid Object Id' })
 user: string;
 
 @IsArray()
 categories: string[];

}