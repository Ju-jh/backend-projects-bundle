import { IsNotEmpty } from 'class-validator';

export class CreateProfileDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  nickname: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  phoneNumber: number;

  createdAt: Date;
}
