import { Exclude, Expose, Transform } from 'class-transformer';
import { IsString } from 'class-validator';

@Exclude()
export class DetailProfileDto {
  @Expose()
  @IsString()
  photo: string;

  @Expose()
  @IsString()
  bio: string;

  @Expose()
  @IsString()
  location: string;

  @Expose()
  @IsString()
  website: string;

  @Expose()
  @Transform((value, obj) => obj.user.user_name)
  name: string;

  @Expose()
  @Transform((value, obj) => obj.user.user_email)
  email: string;

  @Expose()
  @Transform((value, obj) => obj.user.createdAt)
  joind: string;
}
