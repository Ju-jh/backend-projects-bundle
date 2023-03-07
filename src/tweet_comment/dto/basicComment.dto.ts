import { Exclude, Expose, Transform } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

@Exclude()
export class BasicCommentDto {
  @Expose()
  @IsOptional()
  @IsNumber()
  tweetId: number;

  @Expose()
  @Transform((value, obj) => obj.user.user_name)
  name: string;

  @Expose()
  @IsString()
  comments: string;

  @Expose()
  @IsDate()
  createdAt: Date;
}
