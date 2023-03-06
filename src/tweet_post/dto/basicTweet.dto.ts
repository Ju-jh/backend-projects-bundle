import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@Exclude()
export class BasicTweetDto {
  @Expose()
  @IsString()
  contents: string;

  @Expose()
  @IsNumber()
  likes?: number;

  @Expose()
  @IsNumber()
  bookmark: number;

  @Expose()
  @IsOptional()
  @IsNumber()
  userId: number;

  @Expose()
  @IsOptional()
  @IsNumber()
  id: number;
}
