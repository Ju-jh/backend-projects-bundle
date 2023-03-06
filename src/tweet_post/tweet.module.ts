import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { Tweet } from './entities/tweet.entity';
import { TweetPostController } from './tweet.controller';
import { TweetPostService } from './tweet.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tweet]), AuthModule],
  controllers: [TweetPostController],
  providers: [TypeOrmModule, TweetPostService],
  exports: [TweetPostService],
})
export class TweetPostModule {}
