import { IsNumber, IsString } from 'class-validator';

export class TweetLikeDto {
  // @IsString()
  // user_name: string;

  @IsString()
  comments: string;

  @IsString()
  retweets?: string;

  @IsNumber()
  likes?: number;
}
