import { Exclude, Expose, Transform } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';

@Exclude()
export class DetailCommentDto {
  @Expose()
  @Transform((value, obj) => obj.user.user_name)
  name: string;

  @Expose()
  @Transform((value, obj) => obj.user.user_email)
  email: string;

  @Expose()
  @IsString()
  comments: string;

  @Expose()
  @IsDate()
  createdAt: Date;
}
