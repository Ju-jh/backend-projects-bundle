import { IsNotEmpty } from 'class-validator';

export class BasicProfileDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  nickname: string;

  @IsNotEmpty()
  password: string;

  phot: string;

  updateAt: Date;
}
