import { IsNotEmpty, IsString } from 'class-validator';

export class EditPasswordDto {
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
