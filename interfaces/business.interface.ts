import { Document } from 'mongoose';
import IAddress from './address.interface';
import IBankInfo from './bankInfo.interface';

export default interface IBusiness extends Document {
  vendorEmail: string;
  bName: string;
  bEmail: string;
  bEmailVerified: boolean;
  bMobileNum: string;
  bMobileVerified: boolean;
  bAddress: IAddress['_id'];
  bankInfo: IBankInfo['_id'];
  gstNo: string;
  PAN: string;
  aadhar: string;
}
