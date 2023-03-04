import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  photo: string;

  @IsString()
  bio: string;

  @IsString()
  location: string;

  @IsString()
  website?: string;

  @IsOptional()
  @IsNumber()
  userId: number;
}
