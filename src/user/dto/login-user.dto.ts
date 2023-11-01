import { IsEmail } from 'class-validator';

export class LogInDto {
  @IsEmail()
  email: string;

  password: string;
}

