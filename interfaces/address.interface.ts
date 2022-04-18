import { Document } from 'mongoose';

export default interface IAddress extends Document {
  name: string;
  mobileNum: string;
  email: string;
  street: string;
  city: string;
  state: string;
  country: string;
  postCode: string;
  landmark: string;
}
