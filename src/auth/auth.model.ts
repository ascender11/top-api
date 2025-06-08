import { BaseModel } from 'src/common/base.model';

export class AuthModel extends BaseModel {
  email: string;
  passwordHash: string;
}
