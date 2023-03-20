import { IsNotEmpty, IsString } from 'class-validator';

export class DeletePostDto {
  @IsNotEmpty()
  @IsString()
  _id: string;
}
