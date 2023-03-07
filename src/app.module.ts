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
import { Like } from './tweet_post/entities/tweetLike.entity';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: parseInt(process.env.PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PW,
      database: process.env.DB_DATABASE,
      entities: [User, Profile, Tweet, TweetComment, Like],
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
