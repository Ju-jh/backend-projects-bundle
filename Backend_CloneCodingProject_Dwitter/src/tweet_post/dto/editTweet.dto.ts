import { IsNumber, IsOptional, IsString } from 'class-validator';

export class EditTweetDto {
  @IsString()
  contents: string;

  @IsOptional()
  @IsNumber()
  userId: number;
}
