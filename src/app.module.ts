import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './tweet_profile/profile.module';
import { TweetSoketModule } from './tweet_soket/tweet_soket.module';
import { User } from './tweet_user/entities/user.entity';
import { UserModule } from './tweet_user/user.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { Profile } from './tweet_profile/entities/profile.entity';
import CatchException from './exception/CatchException';
import { TweetPostModule } from './tweet_post/tweet.module';
import { TweetCommentModule } from './tweet_comment/tweet_comment.module';
import { Tweet } from './tweet_post/entities/tweet.entity';
import { TweetComment } from './tweet_comment/entities/tweet_comment.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'whgustn5402!',
      database: 'tweet',
      entities: [User, Profile, Tweet, TweetComment],
      synchronize: true,
      autoLoadEntities: true,
    }),
    AuthModule,
    ProfileModule,
    UserModule,
    TweetPostModule,
    TweetCommentModule,
    TweetSoketModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: AuthInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: CatchException,
    },
  ],
})
export class AppModule {}
