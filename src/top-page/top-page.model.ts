import { BaseModel } from 'src/common/base.model';

export enum TopLevelCategory {
  Courses,
  Services,
  Books,
  Products,
}

export class HhData {
  count: number;
  juniorSalary: number;
  middleSalary: number;
  seniorSalary: number;
}

export class TopPageAdvantage {
  title: string;
  description: string;
}

export class TopPageModel extends BaseModel {
  firstCategory: TopLevelCategory;
  secondCategory: string;
  ailas: string;
  title: string;
  category: string;
  hh?: HhData;
  advantages: TopPageAdvantage[];
  seoText: string;
  tagsTitle: string;
  tags: string[];
}
