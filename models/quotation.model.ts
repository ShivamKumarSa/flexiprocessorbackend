import mongoose, { Schema } from 'mongoose';
import { currentQuotationStatus, IQuotation } from '../interfaces/quotation.interface';

const QuotationSchema: Schema = new Schema({
  order: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  vendor: {
    type: Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true,
  },
  currentStatus: {
    type: String,
    enum: Object.values(currentQuotationStatus),
    required: true,
  },
});

// Export the model and return your IOrder interface
export default mongoose.model<IQuotation>('Quotation', QuotationSchema);
