import { Document } from 'mongoose';

export interface IRAM extends Document {
  company: string;
  name: string;
  RAMType: number;
  clockSpeed: number;
  capacity: number;
}
