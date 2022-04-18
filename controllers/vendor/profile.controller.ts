import { Request, Response } from 'express';
import Vendor from '../../models/vendor.model';
import BusinessProfile from '../../models/business.model';
import { auth } from '../../firebase-auth/fireBaseConfig';
import client from '../../config/twilio.config';
import Address from '../../models/address.model';
import BankInfo from '../../models/bankInfo.model';

export const createVendorProfile = async (req: Request, res: Response) => {
  // console.log('Printing body', req.body);
  console.log('Reached Here');
  console.log('Reached the Vendor Profile Controller');
  const { firebaseId, email, firstName, lastName, mobileNum, emailVerified, type } = req.body;
  const newVendor = new Vendor({
    firebaseId,
    email,
    firstName,
    lastName,
    mobileNum,
    emailVerified,
  });
  console.log(newVendor);
  try {
    await newVendor.save();
    await auth.setCustomUserClaims(firebaseId, { Vendor: true });
    res.status(201).json(newVendor);
  } catch (error: any) {
    res.status(409).json({ message: error.message });
  }
};

export const getVendorProfile = async (req: Request, res: Response) => {
  // Get firebaseId from req.body
  console.log(req.header);
  const { firebaseId } = req.body;
  console.log(firebaseId);
  try {
    const VendorProfile = await Vendor.find({ firebaseId });
    res.status(200).json(VendorProfile);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

export const checkVendorProfile = async (req: Request, res: Response) => {
  // Get firebaseId from req.body
  console.log(req.body);
  const { email } = req.body;
  console.log(email);
  try {
    const VendorProfile = await Vendor.findOne({ email });
    console.log(VendorProfile);
    if (VendorProfile) {
      console.log('good');
      res.status(200).json({ VendorExists: true });
    } else {
      console.log('Not there');
      res.status(200).json({ VendorExists: false });
    }
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

export const getVendorUsingUID = async (req: Request, res: Response) => {
  const { firebaseId } = req.body;
  try {
    const VendorProfile = await Vendor.findOne({ firebaseId });
    // console.log(VendorProfile);
    if (VendorProfile) {
      res.status(200).json(VendorProfile);
    }
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

export const getBusinessProfile = async (req: Request, res: Response) => {
  const { vendorEmail } = req.body;
  try {
    const bProfile = await BusinessProfile.findOne({ vendorEmail })
      .populate('bAddress')
      .populate('bankInfo');
    console.log(bProfile);
    if (bProfile) {
      res.status(200).json({ bProfile, exists: true });
    } else {
      res.status(200).json({ bProfile, exists: false });
    }
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

export const updateVendorProfile = async (req: Request, res: Response) => {
  try {
    const { email, firstName, lastName, mobileNum, emailVerified } = req.body;
    const vendorData = await Vendor.findOne({ email });
    if (vendorData) {
      try {
        const updatedVendor = {
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
        await Vendor.findByIdAndUpdate(vendorData.id, updatedVendor, { new: true });
        res.status(200).json(updatedVendor);
      } catch (err: any) {
        res.status(404).json({ message: err.message });
      }
    } else {
      res.status(200).json({ UserNotFound: 'No Vendor with Current Email Id Found' });
    }
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

export const updateBusinessProfile = async (req: Request, res: Response) => {
  try {
    const { vendorEmail, bName, bEmail, bMobileNum, bAddress, bankInfo, gstNo, PAN, aadhar } =
      req.body;
    const { accNo, ifscCode, accHolderName } = bankInfo;
    const { street, city, state, country, postCode } = bAddress;

    // Check if the Business Information Already Exists
    const businessData = await BusinessProfile.findOne({ vendorEmail });

    // If Business Information Already Exists
    if (businessData) {
      console.log('Area to Update the Profile');
      try {
        const updatedBusinessData = {
          bName,
          bEmail,
          bEmailVerified: businessData.bEmailVerified,
          bMobileVerified: businessData.bMobileVerified,
          gstNo,
          PAN,
          aadhar,
        };

        if (businessData.bMobileNum !== bMobileNum) {
          updatedBusinessData.bMobileVerified = false;
        }

        if (businessData.bEmail !== bEmail) {
          updatedBusinessData.bEmailVerified = false;
        }

        const updatedBankInfo = {
          accNo,
          ifscCode,
          accHolderName,
        };

        const updatedAddress = {
          street,
          city,
          state,
          country,
          postCode,
        };

        await BusinessProfile.findByIdAndUpdate(businessData.id, updatedBusinessData, {
          new: true,
        });
        await Address.findByIdAndUpdate(businessData.bAddress, updatedAddress, { new: true });
        await BankInfo.findByIdAndUpdate(businessData.bankInfo, updatedBankInfo, { new: true });
        res.status(200).json({ updatedProfile: true });
      } catch (err: any) {
        res.status(404).json({ updateBusinessProfile: 'Business Profile Not Updated' });
      }
      // IF THE BUSINESS DATA DIDN'T EXISTED
    } else {
      try {
        // CHECK IF THE VENDOR EMAIL EXISTS IN VENDOR DB
        const VendorProfile = await Vendor.findOne({ email: vendorEmail });
        // IF VENDOR EXISTS
        if (VendorProfile) {
          try {
            // CREATE A NEW BUSINESS PROFILE
            const newBusinessProfile = new BusinessProfile({
              vendorEmail,
              bName,
              bEmail,
              bMobileNum,
              gstNo,
              PAN,
              aadhar,
            });
            // CREATE A NEW ADDRESS
            const newAddress = new Address({
              email: vendorEmail,
              street,
              city,
              state,
              country,
              postCode,
            });
            // SAVE NEW ADDRESS IN ADDRESS DATABASE
            await newAddress.save();
            // CREATE A NEW BANK INFO
            const newBankInfo = new BankInfo({
              email: vendorEmail,
              accNo,
              ifscCode,
              accHolderName,
            });
            // SAVE NEW BANK INFO IN BANK DB
            await newBankInfo.save();
            // PUSH THE BANK AND ADDRESS INFORMATION IN THE BUSINESS PROFILE
            newBusinessProfile.bAddress = newAddress.id;
            newBusinessProfile.bankInfo = newBankInfo.id;
            // SAVE THE BUSINESS PROFILE IN DB
            await newBusinessProfile.save();
            console.log(newBusinessProfile);

            res.status(200).json({ updatedProfile: true });
          } catch (err: any) {
            console.log('This is the Error', err);
            res.json(err);
          }
        } else {
          res.status(204).json({ VendorExists: false });
        }
      } catch (err: any) {
        res.status(404).json({ hELLO: "Query Didn't Go Well Part2" });
      }
    }
  } catch (err: any) {
    res.status(404).json({ hELLO: "Query Didn't Go Well" });
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
      await BusinessProfile.findOneAndUpdate(
        { vendorEmail: req.body.vendorEmail },
        { bMobileVerified: true },
        {
          new: true,
        },
      );
      res.status(201).json({ status: 'approved' });
    } catch (err: any) {
      res.status(200).json({ msg: 'MongoDB Server Error' });
    }
  } else {
    res.status(200).json({ status: 'rejected' });
  }
};

export const getCodeEmail = async (req: Request, res: Response) => {
  console.log('Getting code for you', req.body);
  const twilioClient = await client.verify
    .services(process.env.TWILIO_VERIFY_SERVICE_ID as string)
    .verifications.create({
      to: `${req.body.email}`,
      channel: 'email',
    });
  res.json(twilioClient);
  // Update these data in the database
};

export const verifyCodeEmail = async (req: Request, res: Response) => {
  console.log('Verifying code for you', req.body);
  const twilioClient = await client.verify
    .services(process.env.TWILIO_VERIFY_SERVICE_ID as string)
    .verificationChecks.create({
      to: `${req.body.email}`,
      code: req.body.otpEmail,
    });
  if (twilioClient.status === 'approved') {
    try {
      await BusinessProfile.findOneAndUpdate(
        { vendorEmail: req.body.vendorEmail },
        { bEmailVerified: true },
        {
          new: true,
        },
      );
      res.status(201).json({ status: 'approved' });
    } catch (err: any) {
      res.status(200).json({ msg: 'MongoDB Server Error' });
    }
  } else {
    res.status(200).json({ status: 'rejected' });
  }
};
