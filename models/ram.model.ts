import mongoose, { Schema } from 'mongoose';
import { IRAM } from '../interfaces/ram.interface';

const RAMSchema: Schema = new Schema({
  company: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  RAMType: {
    type: Number,
    required: true,
  },
  clockSpeed: {
    type: Number,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
});

// Export the model and return your IRAM interface
export default mongoose.model<IRAM>('RAM', RAMSchema);
