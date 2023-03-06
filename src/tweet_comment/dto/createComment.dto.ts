import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  comments: string;

  @IsOptional()
  @IsNumber()
  tweetId: number;

  @IsOptional()
  @IsNumber()
  userId: number;
}
