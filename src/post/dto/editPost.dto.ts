import { IsNotEmpty, IsString } from 'class-validator';

export class EditPostDto {
  @IsNotEmpty()
  @IsString()
  namespace: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  text: string;

  @IsNotEmpty()
  @IsString()
  contributors: Array<any>;
}
