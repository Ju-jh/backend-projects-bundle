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

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Amuwiki', schema: AmuwikiSchema },
      { name: 'User', schema: UserSchema },
    ]),
    AuthModule,
    UserModule,
    AmuwikiModule,
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {
  static async setup(app: NestFastifyApplication) {
    app.register(fastifyStatic, {
      root: join(__dirname, '..', 'public'),
      prefix: '/public/',
    });

    await app.listen(process.env.PORT || 3000, '0.0.0.0');
  }
}
