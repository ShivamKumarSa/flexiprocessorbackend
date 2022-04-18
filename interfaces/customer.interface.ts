import { Document } from 'mongoose';
import IAddress from './address.interface';

export interface ICustomer extends Document {
  firebaseId: string;
  email: string;
  firstName: string;
  lastName: string;
  mobileNum: string;
  emailVerified: boolean;
  address: IAddress['_id'];
}
