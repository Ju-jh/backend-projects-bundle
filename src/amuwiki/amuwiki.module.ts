import { Module } from '@nestjs/common';
import { AmuwikiController } from './amuwiki.controller';
import { AmuwikiService } from './amuwiki.service';

@Module({
  controllers: [AmuwikiController],
  providers: [AmuwikiService]
})
export class AmuwikiModule {}
