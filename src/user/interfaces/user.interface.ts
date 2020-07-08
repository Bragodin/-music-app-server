import { Document } from 'mongoose';

export interface IUser extends Document {
  readonly name: string;
  status: string;
  readonly email: string;
  readonly password: string;
  readonly roles: Array<string>;
  readonly avatar: string;
}
