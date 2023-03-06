import { IsNumber, IsOptional, IsString } from 'class-validator';

export class EditCommentDto {
  @IsString()
  comments: string;
}
