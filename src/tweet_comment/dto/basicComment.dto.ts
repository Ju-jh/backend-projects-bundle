import { Exclude, Expose, Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@Exclude()
export class BasicCommentDto {
  @Expose()
  @IsOptional()
  @IsNumber()
  tweetId: number;

  @Expose()
  @Transform((value, obj) => obj.user.user_name)
  user_name: string;

  @Expose()
  @IsString()
  comments: string;

  @Expose()
  @Transform((value, obj) => obj.tweet.createdAt)
  createdAt: string;
}
