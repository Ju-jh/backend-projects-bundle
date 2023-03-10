import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import fastifyCookie from 'fastify-cookie';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.register(fastifyCookie, {
    secret: process.env.ACCESS_TOKEN_PRIVATE_KEY, // 쿠키 암호화에 사용될 시크릿 키
    parseOptions: {}, // 쿠키 파싱 옵션
    serializeOptions: {}, // 쿠키 직렬화 옵션
  });
  const configService = app.get(ConfigService);
  await app.listen(configService.get<number>('PORT') || 3000, '0.0.0.0');
}
bootstrap();
