// Customer Model
import { Request, Response } from 'express';
import Customer from '../../models/customer.model';
import { auth } from '../../firebase-auth/fireBaseConfig';
import client from '../../config/twilio.config';
import Address from '../../models/address.model';

export const createCustomerProfile = async (req: Request, res: Response) => {
  console.log('Printing body rEACHED THE cUSTOMER pROFILE', req.body);
  const { firebaseId, email, firstName, lastName, mobileNum, emailVerified, type } = req.body;
  const newCustomer = new Customer({
    firebaseId,
    email,
    firstName,
    lastName,
    mobileNum,
    emailVerified,
  });
  console.log(newCustomer);
  try {
    await newCustomer.save();
    await auth.setCustomUserClaims(firebaseId, { Customer: true });
    res.status(201).json(newCustomer);
  } catch (error: any) {
    res.status(409).json({ message: error.message });
  }
};

export const getCustomerProfileUsingUID = async (req: Request, res: Response) => {
  // Get firebaseId from req.body
  console.log('Reached To Customer Profile Using UID');
  // console.log(req.header);
  console.log(req.body);
  const { firebaseId } = req.body;
  console.log(firebaseId);
  try {
    const customerProfile = await Customer.findOne({ firebaseId }).populate('address');
    console.log(customerProfile);
    res.status(200).json(customerProfile);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

export const checkCustomerProfile = async (req: Request, res: Response) => {
  // Get Email from req.body
  console.log(req.body);
  const { email } = req.body;
  console.log(email);
  try {
    const customerProfile = await Customer.findOne({ email });
    console.log(customerProfile);
    if (customerProfile) {
      console.log('good');
      res.status(200).json({ customerExists: true });
    } else {
      console.log('Not there');
      res.status(200).json({ customerExists: false });
    }
  } catch (err: any) {
    res.status(200).json({ message: err.message });
  }
};

export const updateCustomerProfile = async (req: Request, res: Response) => {
  console.log('Reached the Update Profile For Customer');
  console.log(req.body);
  try {
    const { email, firstName, lastName, mobileNum, emailVerified } = req.body;
    const customerData = await Customer.findOne({ email });

    console.log(customerData?.id);
    if (customerData) {
      try {
        const updatedCustomer = {
          email,
          firstName,
          lastName,
          mobileNum,
          emailVerified,
        };
        const { uid } = await auth.getUserByEmail(email);
        console.log('uid is:', uid);
        const userRecord = await auth.updateUser(uid, {
          displayName: `${firstName} ${lastName}`,
        });
        await Customer.findByIdAndUpdate(customerData.id, updatedCustomer, { new: true });
        res.status(200).json(updatedCustomer);
      } catch (err: any) {
        res.status(404).json({ message: err.message });
      }
    } else {
      res.status(200).json({ UserNotFound: 'No User with Current Email Id Found' });
    }
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  console.log('change password');
  try {
    const { oldPassword, email, password } = req.body;
    console.log(req.body);
  } catch (e: any) {
    console.log('error');
  }
};

export const getCode = async (req: Request, res: Response) => {
  console.log('Getting code for you', req.body);
  const twilioClient = await client.verify
    .services(process.env.TWILIO_VERIFY_SERVICE_ID as string)
    .verifications.create({
      to: `+91${req.body.phoneNumber}`,
      channel: 'sms',
    });
  res.json(twilioClient);
  // Update these data in the database
};

export const verifyCode = async (req: Request, res: Response) => {
  console.log('Verifying code for you', req.body);
  const twilioClient = await client.verify
    .services(process.env.TWILIO_VERIFY_SERVICE_ID as string)
    .verificationChecks.create({
      to: `+91${req.body.phoneNumber}`,
      code: `${req.body.otp}`,
    });
  if (twilioClient.status === 'approved') {
    try {
      await Customer.findOneAndUpdate(
        { email: req.body.email },
        { mobileVerified: true },
        {
          new: true,
        },
      );
      res.status(201).json({ status: 'approved' });
    } catch (err: any) {
      res.status(404).json({ msg: 'MongoDB Server Error' });
    }
  } else {
    res.status(200).json({ status: 'rejected' });
  }
};

export const addCustomerAddress = async (req: Request, res: Response) => {
  console.log('Adding customer address', req.body);
  console.log('The Email Entered', req.body.email);
  try {
    const customerProfile = await Customer.findOne({ email: req.body.email });
    console.log(customerProfile);
    if (customerProfile) {
      try {
        const newAddress = new Address({
          email: req.body.email,
          name: req.body.addressData.fullName,
          mobileNum: req.body.addressData.mobileNum,
          street: req.body.addressData.street,
          city: req.body.addressData.city,
          state: req.body.addressData.state,
          country: req.body.addressData.country,
          postCode: req.body.addressData.postCode,
          landmark: req.body.addressData.landmark,
        });

        await newAddress.save();

        const updatedCustomerProfile = await Customer.findOneAndUpdate(
          { email: req.body.email },
          { $push: { address: newAddress.id } },
          { new: true },
        );

        console.log(updatedCustomerProfile);

        res.status(200).json({ added: true });
      } catch (err: any) {
        res.status(200).json({ err, added: false });
      }
    } else {
      res.status(200).json({ msg: "User Doesn't Exists", added: false });
    }
  } catch (err: any) {
    res.status(200).json({ err, added: false });
  }
};
export const editCustomerAddress = async (req: Request, res: Response) => {
  console.log(req.body);

  const updatedAddress = new Address({
    email: req.body.email,
    name: req.body.addressData.fullName,
    mobileNum: req.body.addressData.mobileNum,
    street: req.body.addressData.street,
    city: req.body.addressData.city,
    state: req.body.addressData.state,
    country: req.body.addressData.country,
    postCode: req.body.addressData.postCode,
  });

  console.log('DSFJLKSDJLKFJ SDLKFJSDLKJF SDLFKJLSDKJF SLDKFSDJ ');

  try {
    // eslint-disable-next-line no-underscore-dangle
    const add = await Address.findByIdAndUpdate(req.body._id, updatedAddress);
    console.log('Haan viiiiiiii', add);
    res.status(200).json({ updated: true });
  } catch {
    res.status(200).json({ updated: false });
  }
};
export const removeCustomerAddress = async (req: Request, res: Response) => {
  console.log('Remove the Address');
  console.log(req.body);
  // Customer Email, Address Id in Req Body

  try {
    await Customer.findOneAndUpdate(
      { email: req.body.customer_email },
      {
        $pullAll: {
          address: [req.body.address_id],
        },
      },
      { new: true },
    );
    await Address.findByIdAndDelete(req.body.address_id);
    res.status(200).json({ deleted: true });
  } catch (err: any) {
    console.log(err);
    res.json({ deleted: false });
  }
};
