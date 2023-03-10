import { ApiProperty } from '@nestjs/swagger';

export class SearchAmuwikiDto {
  @ApiProperty()
  namespace: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  text: string;

  @ApiProperty()
  contributors: Array<any>;
}
