import { ICustomer } from './customer.interface';

export interface IVendor extends ICustomer {
  PAN: string;
  aadhar: string;
}
