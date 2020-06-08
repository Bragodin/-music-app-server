import { Document } from 'mongoose';

export interface IUser extends Document {
  readonly email: string;
  readonly password: string;
  readonly role: Array<string>;
  readonly avatar: string;
}
