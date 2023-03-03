import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  user_email?: string;

  @IsString()
  user_name: string;

  @IsString()
  user_password?: string;

  @IsString()
  user_birthday: string;
}
