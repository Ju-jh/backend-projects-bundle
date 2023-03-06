import { IsString } from 'class-validator';

export class DetailCommentDto {
  @IsString()
  comments: string;
}
