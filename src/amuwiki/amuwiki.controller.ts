import { FastifyRequest, FastifyReply } from 'fastify';
import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import { AmuwikiService } from './amuwiki.service';

@Controller('amuwiki')
export class AmuwikiController {
  constructor(private readonly amuwikiService: AmuwikiService) {}

  @Get('/search/:query')
  async search(
    @Param('query') query: string,
    @Req() req: FastifyRequest,
    @Res() res: FastifyReply,
  ) {
    const result = await this.amuwikiService.search(query);
    res.send(result);
  }
}
