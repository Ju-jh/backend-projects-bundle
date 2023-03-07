import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './tweet_profile/profile.module';
import { User } from './tweet_user/entities/user.entity';
import { UserModule } from './tweet_user/user.module';
import { Profile } from './tweet_profile/entities/profile.entity';
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
      password: 'Rhkdqnr1004',
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
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
