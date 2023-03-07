import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  user_email: string;

  @IsString()
  user_name: string;

  @IsString()
  user_password: string;

  @IsString()
  user_birthday?: string;

  @IsOptional()
  @IsNumber()
  tweetId?: number;
}
