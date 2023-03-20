import { FastifyRequest, FastifyReply } from 'fastify';
import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import { AmuwikiService } from './amuwiki.service';

@Controller('amuwiki')
export class AmuwikiController {
  constructor(private readonly amuwikiService: AmuwikiService) {}

  @Get('/search')
  async search(
    @Query('query') query: string,
    @Req() req: FastifyRequest,
    @Res() res: FastifyReply,
  ) {
    const result = await this.amuwikiService.search(query);
    res.send(result);
  }
}
