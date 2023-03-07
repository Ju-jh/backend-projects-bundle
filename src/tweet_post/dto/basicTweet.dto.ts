import { Exclude, Expose, Transform } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

@Exclude()
export class BasicTweetDto {
  @Expose()
  @IsOptional()
  @IsNumber()
  id: number;

  @Expose()
  @Transform((value, obj) => obj.user.user_email)
  email: string;

  @Expose()
  @IsString()
  contents: string;

  @Expose()
  @IsNumber()
  likes: number;

  @Expose()
  @IsBoolean()
  bookmark: boolean;
}
