import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { TweetCdModule } from './tweet_cd/tweet_cd.module';
import { TweetRModule } from './tweet_r/tweet_r.module';
import { TweetSoketModule } from './tweet_soket/tweet_soket.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '@Rhkdqnr1004',
      database: 'tweet',
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
    AuthModule,
    ProfileModule,
    TweetCdModule,
    TweetRModule,
    TweetSoketModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
