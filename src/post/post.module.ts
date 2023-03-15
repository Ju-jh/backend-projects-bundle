import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AmuwikiModule } from 'src/amuwiki/amuwiki.module';
import { AmuwikiSchema } from 'src/amuwiki/schema/amuwiki.schema';
import { AuthModule } from 'src/auth/auth.module';
import { UserSchema } from 'src/user/schemas/user.schema';
import { UserModule } from 'src/user/user.module';
import { PostController } from './post.controller';
import { PostService } from './post.service';

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
export class PostModule {}
