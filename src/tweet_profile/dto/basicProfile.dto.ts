import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class BasicProfileDto {
  @IsString()
  photo: string;

  @Transform(({ obj }) => obj.user.user_name)
  user_name: string;

  @Transform(({ obj }) => obj.user.user_email)
  user_email: string;

  @Transform(({ obj }) => obj.user.createdAt)
  joind: string;
}
