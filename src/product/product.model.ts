import { BaseModel } from 'src/common/base.model';

export class ProductCharacteristic {
  name: string;
  value: string;
}

export class ProductModel extends BaseModel {
  image: string;
  title: string;
  price: number;
  oldPrice: number;
  credit: number;
  calculatedRating: number;
  description: string;
  advantages: string;
  disadvantages: string;
  categories: string[];
  tags: string[];
  characteristics: ProductCharacteristic[];
}
