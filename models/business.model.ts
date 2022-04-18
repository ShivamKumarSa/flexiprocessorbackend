import mongoose, { Schema } from 'mongoose';
import IBusiness from '../interfaces/business.interface';

const BusinessSchema: Schema = new Schema({
  vendorEmail: { type: String, required: true, unique: true },
  bName: { type: String, required: true },
  bEmail: { type: String, required: true, unique: true },
  bEmailVerified: { type: Boolean, required: true, default: false },
  bMobileNum: { type: String, required: true, unique: true },
  bMobileVerified: { type: Boolean, required: true, default: false },
  bAddress: { type: Schema.Types.ObjectId, ref: 'Address' },
  bankInfo: { type: Schema.Types.ObjectId, ref: 'BankInfo' },
  gstNo: { type: String, required: true, unique: true },
  PAN: { type: String, required: true, unique: true },
  aadhar: { type: String, required: true, unique: true },
});
export default mongoose.model<IBusiness>('BusinessProfile', BusinessSchema);
