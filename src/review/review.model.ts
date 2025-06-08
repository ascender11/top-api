import { BaseModel } from 'src/common/base.model';

export class ReviewModel extends BaseModel {
  name: string;
  title: string;
  description: string;
  rating: number;
}
