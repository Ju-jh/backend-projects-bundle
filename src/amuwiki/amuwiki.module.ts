import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { MongooseModule } from '@nestjs/mongoose';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { join } from 'path';
import { AmuwikiController } from './amuwiki.controller';
import { AmuwikiService } from './amuwiki.service';
import { AmuwikiSchema } from './schema/amuwiki.schema';
import fastifyStatic from 'fastify-static';

@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      useFactory: () => ({
        node: process.env.ELASTICSEARCH_NODE,
        auth: {
          username: process.env.ELASTICSEARCH_USERNAME,
          password: process.env.ELASTICSEARCH_PASSWORD,
        },
      }),
    }),
    MongooseModule.forFeature([{ name: 'Amuwiki', schema: AmuwikiSchema }]),
  ],
  controllers: [AmuwikiController],
  providers: [AmuwikiService],
})
export class AmuwikiModule {
  static async setup(app: NestFastifyApplication) {
    app.register(fastifyStatic, {
      root: join(__dirname, '..', 'public'),
      prefix: '/public/',
    });

    await app.listen(process.env.PORT || 3000, '0.0.0.0');
  }
}
