import { Document } from 'mongoose';
import { ICustomer } from './customer.interface';
import { IProcessor } from './processor.interface';
import { IRAM } from './ram.interface';
import { IStorage } from './storage.interface';
import { IVendor } from './vendor.interface';
import { IQuotation } from './quotation.interface';

export enum currentOrderStatus {
  active = 'active',
  hold = 'quotationsCompleted',
  completed = 'quotationSelected',
}

export interface IOrder extends Document {
  customer: ICustomer['firebaseId'];
  // ENUM FOR CURRENT STATUS
  currentStatus: currentOrderStatus;
  vendor: IVendor['firebaseId'];
  // Processor
  processor: IProcessor['_id'];
  // RAM
  ram: IRAM['_id'];
  // Storage
  storage: IStorage['_id'];
  // selectedQuotation:
  selectedQuotation: IQuotation['_id'];
}
