import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Profile extends Document {
  @Prop()
  email: string;
  @Prop()
  url: string;
  @Prop()
  nickname: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
