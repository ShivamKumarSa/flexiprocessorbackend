import { Document } from 'mongoose';

export default interface IBankInfo extends Document {
  email: string;
  accNo: number;
  ifscCode: string;
  accHolderName: string;
}
