import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import forgotPasswordRouter from './routes/forgotPasswd';
import vendorRouter from './routes/vendor';
import customerRouter from './routes/customer';
import adminRouter from './routes/admin';

// For the MongoDB connection
import connectDB from './config/db';
import CPUConfigRouter from './routes/cpuConfig';

const app = express();

// MongoDB Atlas Connection
connectDB();

app.use(bodyParser.json({ limit: '30mb', extended: true } as { limit: string; extended: boolean }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.get('/', (req, res, next) => {
  res.send('Sample Route to Test the Backend Setup');
});

// --------------- ROUTES ------------------------------- //

// Routes For Vendor
app.use('/api/forgotPassword', forgotPasswordRouter);

// Routes For Vendor
app.use('/api/vendor', vendorRouter);

// Routes For Customer
app.use('/api/customer', customerRouter);

// Routes For Admin
app.use('/api/admin', adminRouter);

// Routes For Admin
app.use('/api/cpuConfig', CPUConfigRouter);

// MONGOOSE SAMPLE CONNECTION
// // LATER TO BE STORED IN ENV
// const CONNECTION_URL = 'mongodb+srv://inderpreetmongo:inderpreetmongo123@cluster0.l6hdc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
// const PORT = process.env.PORT || 5000;
// mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
//     .then(() => app.listen(PORT, () => console.log(`Server runnng on ${PORT}`)))
//     .catch((error) => console.log(error.message));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server runnng on ${PORT}`));
