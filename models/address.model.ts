import mongoose, { Schema } from 'mongoose';
import IAddress from '../interfaces/address.interface';

const AddressSchema: Schema = new Schema({
  name: { type: String },
  mobileNum: { type: String },
  email: { type: String, required: true },
  street: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  postCode: { type: String, required: true },
  landmark: { type: String },
});

// Export the model and return your IUser interface
export default mongoose.model<IAddress>('Address', AddressSchema);
