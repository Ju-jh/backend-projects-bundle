import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { join } from 'path';
import { AmuwikiModule } from 'src/amuwiki/amuwiki.module';
import { AmuwikiSchema } from 'src/amuwiki/schema/amuwiki.schema';
import { AuthModule } from 'src/auth/auth.module';
import { UserSchema } from 'src/user/schemas/user.schema';
import { UserModule } from 'src/user/user.module';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import fastifyStatic from 'fastify-static';
import { AmuwikiService } from 'src/amuwiki/amuwiki.service';
import {
  ElasticsearchModule,
  ElasticsearchService,
} from '@nestjs/elasticsearch';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Amuwiki', schema: AmuwikiSchema },
      { name: 'User', schema: UserSchema },
    ]),
    AuthModule,
    UserModule,
    AmuwikiModule,
    ElasticsearchModule.registerAsync({
      useFactory: () => ({
        node: process.env.ELASTICSEARCH_NODE,
        auth: {
          username: process.env.ELASTICSEARCH_USERNAME,
          password: process.env.ELASTICSEARCH_PASSWORD,
        },
      }),
    }),
  ],
  controllers: [PostController],
  providers: [PostService, AmuwikiService],
})
export class PostModule {
  static async setup(app: NestFastifyApplication) {
    app.register(fastifyStatic, {
      root: join(__dirname, '..', 'public'),
      prefix: '/public/',
    });

    await app.listen(process.env.PORT || 3001, '0.0.0.0');
  }
}
