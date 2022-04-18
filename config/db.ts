import config from 'config';
import mongoose from 'mongoose';

export const db: string = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db);

    console.log('MongoDB Atlas Connected');
  } catch (err: any) {
    console.log(err.message);
    process.exit(1);
  }
};

export default connectDB;
