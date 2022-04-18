import { Document } from 'mongoose';
import { IProcessor } from './processor.interface';
import { IRAM } from './ram.interface';
import { IStorage } from './storage.interface';

export interface IPreDefinedConfiguration extends Document {
  name: string;
  // Processor
  processor: IProcessor['_id'];
  // RAM
  ram: IRAM['_id'];
  // Storage
  storage: IStorage['_id'];
  // Description
  description: string;
}
