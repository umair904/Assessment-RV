import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class ChangePassDto {
  @IsEmail()
  email: string;

  currentPassword: string;

  @MinLength(5)
  @IsNotEmpty()
  newPassword: string;
}

