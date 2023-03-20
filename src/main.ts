import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import fastifyCookie from '@fastify/cookie';
import * as fmp from 'fastify-multipart';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.register(fastifyCookie, {
    secret: process.env.ACCESS_TOKEN_PRIVATE_KEY,
    parseOptions: {},
  });
  app.register(fmp);
  const configService = app.get(ConfigService);
  await app.listen(configService.get<number>('PORT') || 3000, '0.0.0.0');
}
bootstrap();
