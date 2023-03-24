import { IsString, IsNotEmpty } from 'class-validator';

export class VerifyEmailCodeDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  code: string;
}
