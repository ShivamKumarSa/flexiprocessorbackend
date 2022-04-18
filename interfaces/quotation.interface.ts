import { Document } from 'mongoose';
import { ICustomer } from './customer.interface';
import { IOrder } from './order.interface';
import { IVendor } from './vendor.interface';

export enum currentQuotationStatus {
  accepted = 'Accepted',
  rejected = 'Rejected',
  waiting = 'Waiting',
}

export interface IQuotation extends Document {
  order: IOrder['_id'];
  customer: ICustomer['firebaseId'];
  vendor: IVendor['firebaseId'];
  priceQuoted: number;
  description: string;
  // ENUM FOR CURRENT STATUS
  currentQuotationStatus: currentQuotationStatus;
}
