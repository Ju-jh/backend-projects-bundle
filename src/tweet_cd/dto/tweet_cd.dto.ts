import { IsString } from 'class-validator';
import { User } from 'src/auth/dto/auth.dto';

export class CreateTweetDto {
  @IsString()
  comment: string;
}
