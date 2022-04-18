import express, { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { auth } from '../firebase-auth/fireBaseConfig';
// Initiate The Vendor Router
const forgotPasswordRouter: Router = express.Router();

interface JwtPayload {
  recoveryEmail: string;
  otp: string;
}

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'flexiprocessor@gmail.com',
    pass: 'Flexiprocessor@22',
  },
});
/* flexPro@22interns2022 */

forgotPasswordRouter.post('/', async (req: Request, res: Response) => {
  const { recoveryEmail } = req.body;
  try {
    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log(otp);
    const { uid } = await auth.getUserByEmail(recoveryEmail);
    const token = jwt.sign({ recoveryEmail, otp }, 'secretKEY', {
      expiresIn: '30m',
    });
    const message = {
      from: 'flexiprocessor@gmail.com',
      to: recoveryEmail,
      subject: 'Your reset password OTP for Flexiprocessor',
      html: `Hello, <br>Use this OTP to reset your FlexiProcessor password for your
        ${recoveryEmail} account: <br/> <br/>  ${otp} <br/> <br/>If you didnot ask to reset your password, you can ignore this email.`,
    };

    transporter.sendMail(message, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    });

    res.json({ exists: true, token });
  } catch {
    res.json({ exists: false });
  }
});

forgotPasswordRouter.post('/token_verify', async (req: Request, res: Response) => {
  const { token, OTP } = req.body;
  console.log(req.body);
  try {
    const verify = jwt.verify(token, 'secretKEY') as JwtPayload;
    console.log(verify, 'VERIFY', OTP);
    if (OTP === verify.otp) {
      res.json({ verified: true, recoveryEmail: verify.recoveryEmail });
    } else {
      res.json({ verified: false });
    }
  } catch (error: any) {
    res.json({ verify: false });
  }
});

forgotPasswordRouter.post('/changePassword', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const { uid } = await auth.getUserByEmail(email);
    console.log('uid is:', uid);
    const userRecord = await auth.updateUser(uid, {
      password,
    });
    console.log('userRecord is:', userRecord);
    res.json({ updated: true });
  } catch (error: any) {
    res.json({ updated: error });
  }
});

// Export the Formed Router
export default forgotPasswordRouter;
