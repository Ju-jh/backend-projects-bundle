import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './tweet_profile/profile.module';
import { TweetCdModule } from './tweet_cd/tweet_cd.module';
import { TweetRModule } from './tweet_r/tweet_r.module';
import { TweetSoketModule } from './tweet_soket/tweet_soket.module';
import { User } from './tweet_user/entities/user.entity';
import { UserModule } from './tweet_user/user.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { Profile } from './tweet_profile/entities/profile.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '@Rhkdqnr1004',
      database: 'tweet',
      entities: [User, Profile],
      synchronize: true,
      autoLoadEntities: true,
    }),
    AuthModule,
    ProfileModule,
    TweetCdModule,
    TweetRModule,
    TweetSoketModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: AuthInterceptor,
    },
  ],
})
export class AppModule {}
