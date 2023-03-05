import { IsNumber, IsString } from 'class-validator';
export class ReadTweetDto {
  @IsString()
  comments: string;
  @IsString()
  retweets?: string;
  @IsNumber()
  likes?: number;
}
