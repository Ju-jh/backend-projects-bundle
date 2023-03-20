import { IsNotEmpty, IsString } from 'class-validator';

export class EditPostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  text: string;
}
