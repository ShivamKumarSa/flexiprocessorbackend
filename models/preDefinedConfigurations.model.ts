import mongoose, { Schema } from 'mongoose';
import { IPreDefinedConfiguration } from '../interfaces/preDefinedConfigurations.interface';

const PreDefinedConfigurationSchema: Schema = new Schema({
  // Name
  name: {
    type: String,
    required: true,
  },

  // RAM
  ram: {
    type: Schema.Types.ObjectId,
    ref: 'RAM',
    required: true,
  },

  // Processor
  processor: {
    type: Schema.Types.ObjectId,
    ref: 'Processor',
    required: true,
  },

  // Storage
  storage: {
    type: Schema.Types.ObjectId,
    ref: 'Storage',
    required: true,
  },

  // Description
  description: {
    type: String,
    required: true,
  },
});

// Export the model and return your IOrder interface
export default mongoose.model<IPreDefinedConfiguration>(
  'PreDefinedConfiguration',
  PreDefinedConfigurationSchema,
);
