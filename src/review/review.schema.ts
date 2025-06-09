import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseModel } from 'src/common/base.model';

export type ReviewDocument = HydratedDocument<Review>;

@Schema({ timestamps: true })
export class Review extends BaseModel {
  @Prop()
  name: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  rating: number;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
