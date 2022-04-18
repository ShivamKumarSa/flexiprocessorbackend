import mongoose, { Schema } from 'mongoose';
import IBankInfo from '../interfaces/bankInfo.interface';

/* 
  EMAIL is not kept Unique.
  Logic: So, that a single customer or vendor
  can add numerable bank accounts in the future.
*/

const BankInfo: Schema = new Schema({
  email: { type: String, required: true },
  accNo: { type: Number, required: true, unique: true },
  ifscCode: { type: String, required: true },
  accHolderName: { type: String, required: true },
});
export default mongoose.model<IBankInfo>('BankInfo', BankInfo);
