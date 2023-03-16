import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Profile {
  @Prop({ required: true, unique: true })
  email: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
