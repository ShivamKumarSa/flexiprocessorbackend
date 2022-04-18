import express, { Request, Response, Router } from 'express';
import {
  changePassword,
  checkCustomerProfile,
  createCustomerProfile,
  getCustomerProfileUsingUID,
  updateCustomerProfile,
  verifyCode,
  getCode,
  addCustomerAddress,
  editCustomerAddress,
  removeCustomerAddress,
} from '../../controllers/customer/profile.controller';

// Initiate The Customer Router
const customerRouter: Router = express.Router();

// ------- PROFILE ROUTES ---------- //

/**
 * To View the Information of the Customer
 * @description Customer Profile
 * @route POST/ api/customer/profileUsingUID
 */
customerRouter.post('/profileUsingUID', getCustomerProfileUsingUID);

/**
 * To View the Information of the Customer
 * @description Customer Profile
 * @route GET/ api/customer/profile
 */
customerRouter.post('/checkEmail', checkCustomerProfile);

/**
 * To Post the User Information
 * @description Save Customer Profile
 * @route POST/ api/customer/profile
 */
customerRouter.post('/profile', createCustomerProfile);

/**
 * To Update the Information of the Customer
 * @description Customer Profile
 * @route PUT/ api/customer/profile
 */
customerRouter.post('/updateProfile', updateCustomerProfile);

/**
 * To send otp to the customer
 * @description Customer OTP
 * @route  POST / api/customer/getCode
 */
customerRouter.post('/getCode', getCode);

/**
 * To verify otp
 * @description Customer OTP
 * @route POST / api/customer/verifyCode
 */
customerRouter.post('/verifyCode', verifyCode);

/**
 * To add customer address
 * @description Customer Address
 * @route POST / api/customer/addCustomerAddress
 */
customerRouter.post('/addCustomerAddress', addCustomerAddress);

/**
 * To edit customer address
 * @description Customer Address
 * @route POST / api/customer/editCustomerAddress
 */
customerRouter.post('/editCustomerAddress', editCustomerAddress);

/**
 * To remove customer address
 * @description Customer Address
 * @route POST / api/customer/removeCustomerAddress
 */
customerRouter.post('/removeCustomerAddress', removeCustomerAddress);

/**
 * To check if the email of this customer is verified
 * @description Check Email Verification
 * @route GET/ api/customer/profile/verifyEmail
 */
customerRouter.get('/profile/verifyEmail', async (req: Request, res: Response) => {
  res.json({
    'Email Verification':
      'Check if the email is verified or not. Send a boolean by checking through the profile database of the Customer.',
  });
});

/**
 * To update the verification status of email to verified
 * @description Verify the email
 * @route POST/ api/customer/profile/verifyEmail
 */
customerRouter.post('/profile/verifyEmail', async (req: Request, res: Response) => {
  res.json({
    'Email Verification': 'Update the verifiedEmail status to True',
  });
});

/**
 * To update the verification status of email to verified
 * @description Verify the email
 * @route POST/ api/customer/profile/verifyEmail
 */
customerRouter.post('/profile/changePassword', changePassword);

// ------------------ Orders Routes --------------------//

/**
 * Table of All the Active Orders
 * @description Active Orders By User
 * @route GET/ api/customer/activeOrders
 */
customerRouter.get('/activeOrders', async (req: Request, res: Response) => {
  res.json({
    'Active Orders': 'Orders on which quotations are still in process',
  });
});

/**
 * To view all the orders with selected quotations
 * @description View all the orders for which the quotations have been selected
 * @route POST/ api/customer/quotations/:order_id
 */
customerRouter.get('/confirmedOrders', async (req: Request, res: Response) => {
  res.json({
    'Confirmed Orders':
      'Show all the orders of this customer for which a quotation has been selected.',
  });
});

// -------------------- Quotation Orders ---------------------- //

/**
 * All the available Quotations for a specific Order Id
 * @description Available Quotations for a specific order of the customer
 * @route GET/ api/customer/quotations/:order_id
 */
customerRouter.get('/quotations/:order_id', async (req: Request, res: Response) => {
  res.json({
    'Quotations for a Specific Order':
      'All the available quotations for the specific order_id available in the req.params. The list of the quotations will consist of theOrders on which quotations are still in process',
  });
});

/**
 * To select a specific Quotation from the list of quotations for an order
 * @description Select a specific Quotation for an order
 * @route POST/ api/customer/quotations/:order_id
 */
customerRouter.post('/quotations/:order_id', async (req: Request, res: Response) => {
  // Order Id
  console.log(req.params);

  // Quotation Id
  console.log(req.body);

  res.json({
    'Select a Quotation for a Specific Order':
      'Get the Quotation Id of the selected quotation. Change status of this order. Remove this order from the list of the active orders for this customer. Update the collection of the vendor whose quotation has been accepted. Update the rejected status for all other vendors. Remove the order from the activeRequirements of all the vendors',
  });
});

// Export the Formed Router
export default customerRouter;
