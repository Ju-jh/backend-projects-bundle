import { IsNumber, IsString } from 'class-validator';

export class CreateTweetDto {
  // @IsString()
  // user_name: string;

  @IsString()
  comments: string;

  @IsString()
  retweets?: string;

  @IsNumber()
  likes?: number;
}
