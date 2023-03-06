import { Exclude, Expose, Transform } from 'class-transformer';
import { IsString } from 'class-validator';

@Exclude()
export class BasicCommentDto {
  @Expose()
  @IsString()
  comments: string;

  @Expose()
  @Transform((value, obj) => obj.tweet.tweetId)
  tweetId: string;

  @Expose()
  @Transform((value, obj) => obj.user.userId)
  userId: string;

  @Expose()
  @Transform((value, obj) => obj.user.user_name)
  user_name: string;

  @Expose()
  @Transform((value, obj) => obj.tweet.createdAt)
  createdAt: string;
}
