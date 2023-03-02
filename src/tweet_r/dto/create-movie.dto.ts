import { IsString } from 'class-validator';
import { IsNumber } from 'class-validator/types/decorator/decorators';

export class CreateMovieDto {
  @IsString()
  readonly title: string;
  @IsNumber()
  readonly year: number;
  @IsString({ each: true })
  readonly genres: string[];
}
