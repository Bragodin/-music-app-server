import { Document } from 'mongoose';

export interface IMusic extends Document {
  readonly name: string;
  readonly author: string;
  readonly rating?: number;
  readonly likes?: string;
}
