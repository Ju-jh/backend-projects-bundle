import { IsNotEmpty } from 'class-validator';

export class DeleteUserDto {
  @IsNotEmpty()
  password: string;
}
