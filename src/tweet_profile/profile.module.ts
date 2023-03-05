import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Profile } from './entities/profile.entity';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profile]),
    MulterModule.register({
      dest: './files',
    }),
    AuthModule,
  ],
  controllers: [ProfileController],
  providers: [TypeOrmModule, ProfileService, JwtService],
  exports: [ProfileService],
})
export class ProfileModule {}
