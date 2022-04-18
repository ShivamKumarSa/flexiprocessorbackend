import mongoose, { Schema } from 'mongoose';
import { IVendor } from '../interfaces/vendor.interface';

const VendorSchema: Schema = new Schema({
  firebaseId: {
    type: String,
    unique: true,
    required: true,
  },
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  mobileNum: { type: String },
  emailVerified: { type: Boolean, required: true },

  address: {
    type: Schema.Types.ObjectId,
    ref: 'Address',
  },

  PAN: { type: String },
  aadhar: { type: String },
});

// Export the model and return your IVendor interface
export default mongoose.model<IVendor>('Vendor', VendorSchema);
