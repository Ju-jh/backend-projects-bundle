import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Amuwiki extends Document {
  @Prop()
  namespace: number;

  @Prop()
  title: string;

  @Prop()
  text: string;

  @Prop()
  contributors: Array<any>;
}
export const AmuwikiSchema = SchemaFactory.createForClass(Amuwiki);
