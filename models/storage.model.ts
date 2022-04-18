import mongoose, { Schema } from 'mongoose';
import { IStorage, storageType } from '../interfaces/storage.interface';

const StorageSchema: Schema = new Schema({
  company: {
    type: String,
    required: true,
  },
  storageType: {
    type: String,
    enum: Object.values(storageType),
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
});

// Export the model and return your IStorage interface
export default mongoose.model<IStorage>('Storage', StorageSchema);
