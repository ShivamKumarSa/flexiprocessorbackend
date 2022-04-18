import mongoose, { Schema } from 'mongoose';
import { ICustomer } from '../interfaces/customer.interface';

const CustomerSchema: Schema = new Schema({
  firebaseId: {
    type: String,
    unique: true,
    required: true,
  },
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  mobileNum: { type: String },
  emailVerified: { type: Boolean, required: true, default: false },

  address: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Address',
    },
  ],
});

// Export the model and return your IUser interface
export default mongoose.model<ICustomer>('Customer', CustomerSchema);
