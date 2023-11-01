import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";
export class UpdateUserDto {
    @IsString()
    @IsOptional()
    @MaxLength(30)
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsOptional()
    @MaxLength(30)
    address: string;

    @Matches(/^\d{4}-\d{2}-\d{2}$/, {
        message:
          'Kindly provide proper DOB format, YYYY-MM-DD',
      })
    @IsOptional()
    dob: Date;
}