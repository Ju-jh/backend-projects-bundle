import { Controller, Get, Param, Query } from '@nestjs/common';
import { AmuwikiService } from './amuwiki.service';

@Controller('amuwiki')
export class AmuwikiController {
  constructor(private readonly amuwikiService: AmuwikiService) {}

  @Get('/search/:query')
  async search(@Param('query') query: string) {
    return await this.amuwikiService.search(query);
  }
}
