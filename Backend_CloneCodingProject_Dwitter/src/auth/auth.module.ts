import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../tweet_user/user.module';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/tweet_user/entities/user.entity';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('ACCESS_TOKEN_PRIVATE_KEY'),
        signOptions: { expiresIn: '24h' },
      }),
    }),
  ],
  providers: [TypeOrmModule, AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
