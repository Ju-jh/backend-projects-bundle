import { IsNotEmpty, IsString } from 'class-validator';

export class EditNicknameDto {
  @IsNotEmpty()
  @IsString()
  nickname: string;
}
