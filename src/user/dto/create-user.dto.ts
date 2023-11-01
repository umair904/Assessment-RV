import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsString, Matches, MaxLength, MinLength } from "class-validator";
export class CreateUserDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @MinLength(5)
    @IsNotEmpty()
    password: string;

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    @Matches(/^\d{4}-\d{2}-\d{2}$/, {
        message:
          'Kindly provide proper DOB format, YYYY-MM-DD',
      })
    dob: Date;
}