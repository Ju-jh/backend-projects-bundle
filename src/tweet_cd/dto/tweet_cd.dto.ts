import { IsString } from 'class-validator';
import { User } from 'src/auth/user';

export class CreateTweetDto {
  @Field(() => User)
  user: User;
  @IsString()
  comment: string;
}
