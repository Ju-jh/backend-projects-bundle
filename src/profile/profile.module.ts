import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { ProfileSchema } from './schemas/profile.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      {
        name: 'Profile',
        schema: ProfileSchema,
      },
    ]),
    AuthModule,
  ],
  controllers: [ProfileController],
  providers: [MongooseModule, ProfileService, JwtService],
  exports: [ProfileService],
})
export class ProfileModule {}
