import mongoose, { Schema } from 'mongoose';
import { currentOrderStatus, IOrder } from '../interfaces/order.interface';

const OrderSchema: Schema = new Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  currentStatus: {
    type: String,
    enum: Object.values(currentOrderStatus),
    required: true,
  },

  vendor: {
    type: Schema.Types.ObjectId,
    ref: 'Vendor',
  },

  // RAM
  ram: {
    type: Schema.Types.ObjectId,
    ref: 'RAM',
    required: true,
  },

  // Processor
  processor: {
    type: Schema.Types.ObjectId,
    ref: 'Processor',
    required: true,
  },

  // HDD
  storage: {
    type: Schema.Types.ObjectId,
    ref: 'Storage',
    required: true,
  },

  // Selected Quotation
  selectedQuotation: {
    type: Schema.Types.ObjectId,
    ref: 'Quotation',
  },
});

// Export the model and return your IOrder interface
export default mongoose.model<IOrder>('Order', OrderSchema);
