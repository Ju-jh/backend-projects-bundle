import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTweetDto {
  // @IsString()
  // user_name: string;

  @IsString()
  contents: string;

  @IsNumber()
  likes?: number;

  @IsBoolean()
  bookmark: boolean;

  @IsOptional()
  @IsNumber()
  userId: number;

  @IsOptional()
  @IsNumber()
  id: number;
}
