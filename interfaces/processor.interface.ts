import { Document } from 'mongoose';

export interface IProcessor extends Document {
  company: string;
  name: string;
  generation: string;
  baseClockSpeed: number;
  coreCount: number;
  supportedRAMType: number[];
}
