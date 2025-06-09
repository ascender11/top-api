import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseModel } from 'src/common/base.model';
import { HydratedDocument } from 'mongoose';

export type TopPageDocument = HydratedDocument<TopPage>;

export enum TopLevelCategory {
  Courses,
  Services,
  Books,
  Products,
}

@Schema()
export class HhData {
  @Prop()
  count: number;

  @Prop()
  juniorSalary: number;

  @Prop()
  middleSalary: number;

  @Prop()
  seniorSalary: number;
}

@Schema()
export class TopPageAdvantage {
  @Prop()
  title: string;

  @Prop()
  description: string;
}

@Schema({ timestamps: true })
export class TopPage extends BaseModel {
  @Prop({ enum: TopLevelCategory })
  firstCategory: TopLevelCategory;

  @Prop()
  secondCategory: string;

  @Prop()
  title: string;

  @Prop({ unique: true })
  alias: string;

  @Prop()
  category: string;

  @Prop({ type: HhData })
  hh?: HhData;

  @Prop([TopPageAdvantage])
  advantages: TopPageAdvantage[];

  @Prop()
  seoText: string;

  @Prop()
  tagsTitle: string;

  @Prop([String])
  tags: string[];
}

export const TopPageSchema = SchemaFactory.createForClass(TopPage);
