import { Document } from 'mongoose';

export enum storageType {
  SSD = 'Solid State Drive',
  HDD = 'Hard Disk',
}

export interface IStorage extends Document {
  company: string;
  // ENUM for Storage Type
  storageType: storageType;
  capacity: number;
}
