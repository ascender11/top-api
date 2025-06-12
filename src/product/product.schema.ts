import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseModel } from 'src/common/base.model';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ _id: false })
export class ProductCharacteristic {
  @Prop()
  name: string;

  @Prop()
  value: string;
}

@Schema({ timestamps: true })
export class Product extends BaseModel {
  @Prop()
  image: string;

  @Prop()
  title: string;

  @Prop()
  price: number;

  @Prop()
  oldPrice?: number;

  @Prop()
  credit: number;

  @Prop()
  description: string;

  @Prop()
  advantages: string;

  @Prop()
  disadvantages: string;

  @Prop([String])
  categories: string[];

  @Prop([String])
  tags: string[];

  @Prop({ type: [ProductCharacteristic], _id: false })
  characteristics: ProductCharacteristic[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
