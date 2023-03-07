import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsString()
  user_email: string;

  @IsString()
  user_name: string;

  @IsString()
  user_password: string;

  @IsString()
  user_birthday: string;
}
