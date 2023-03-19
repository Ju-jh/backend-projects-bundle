import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Profile {
  @Prop()
  email: string;
  @Prop()
  url: string;
  @Prop()
  nickname: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
