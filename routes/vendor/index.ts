import express, { Request, Response, Router } from 'express';
import {
  checkVendorProfile,
  createVendorProfile,
  getVendorProfile,
  getBusinessProfile,
  getVendorUsingUID,
  updateVendorProfile,
  updateBusinessProfile,
  getCode,
  verifyCode,
  getCodeEmail,
  verifyCodeEmail,
} from '../../controllers/vendor/profile.controller';

// Initiate The Vendor Router
const vendorRouter: Router = express.Router();

// -------------- Profile Routes ----------------- //

/**
 * To View the Information of the Vendor
 * @description Vendor Profile
 * @route GET/ api/vendor/profile
 */
vendorRouter.get('/profile', getVendorProfile);

/**
 * To View the Information of the Vendor using UID
 * @description Vendor Profile
 * @route POST / api/vendor/profileUsingUID
 */
vendorRouter.post('/profileUsingUID', getVendorUsingUID);

/**
 * To Update the personal Information of the Vendor
 * @description Vendor Profile
 * @route POST / api/vendor/updateProfile
 */
vendorRouter.post('/updateProfile', updateVendorProfile);

/**
 * To Update the Business Information of the Vendor
 * @description Vendor Business Profile Update or Create
 * @route POST / api/vendor/updateBusinessProfile
 */
vendorRouter.post('/updateBusinessProfile', updateBusinessProfile);

/**
 * To View the Information of the Vendor Business Profile using UID
 * @description Vendor Business Profile
 * @route POST / api/vendor/bProfileUsingUID
 */
vendorRouter.post('/bProfileUsingUID', getBusinessProfile);

/**
 * To View the Information of the Customer
 * @description Vendor Profile
 * @route GET/ api/customer/profile
 */
vendorRouter.post('/checkEmail', checkVendorProfile);

/**
 * To send OTP
 * @description Vendor Profile
 * @route GET/ api/vendor/getCode
 */
vendorRouter.post('/getCode', getCode);

/**
 * To verify OTP
 * @description Vendor Profile
 * @route GET/ api/vendor/verifyCode
 */
vendorRouter.post('/verifyCode', verifyCode);

/**
 * To send OTP
 * @description Vendor Profile
 * @route GET/ api/vendor/getCodeEmail
 */
vendorRouter.post('/getCodeEmail', getCodeEmail);

/**
 * To verify OTP
 * @description Vendor Profile
 * @route GET/ api/vendor/verifyCodeEmail
 */
vendorRouter.post('/verifyCodeEmail', verifyCodeEmail);

/**
 * To Post the User Information
 * @description Save Vendor Profile
 * @route POST/ api/customer/profile
 */
vendorRouter.post('/profile', createVendorProfile);

// Get Request to view the current Business details
// Post Request to update the buisness details

/**
 * To View the Information of the Vendor Dashboard
 * @description Vendor Dashboard
 * @route GET/ api/vendor/dashboard
 */
vendorRouter.get('/dashboard', async (req: Request, res: Response) => {
  res.json({
    'Vendor Dashboard': 'Send the Basic Information to view on the navbar',
  });
});

// ----------------- Customer Requirement Routes ------------------- //

/**
 * To View the the current requirements active
 * @description Active Customer Requirements
 * @route GET/ api/vendor/activeRequirements
 */
vendorRouter.get('/activeRequirements', async (req: Request, res: Response) => {
  res.json({
    'Active Requirements': 'Send a table of all the active requirements',
  });
});

// ------------------------- Quotation Routes ------------------------------ //

/**
 * Quotation sent from the vendor for the specific order_id
 * @description Quotation Data from order id :order_id
 * @param :order_id
 * @route POST/ api/vendor/activeRequirements/:order_id
 */
vendorRouter.post('/activeRequirements/:order_id', async (req: Request, res: Response) => {
  console.log(req.params);
  res.json({
    'Selected Requirements for Quotation':
      "Quotation data will be receive here, save in quotation db and show in the customer's received quotations",
  });
});

/**
 * To View the the active Quotations
 * Quotations which are neither accepted or rejected
 * @description Active Quotations
 * @route GET/ api/vendor/activeQuotations
 */
vendorRouter.get('/activeQuotations', async (req: Request, res: Response) => {
  res.json({
    'Active Quotations':
      'View all the quotations which are neither accepted or rejected for the vendor.',
  });
});

/**
 * To View the the Rejected Quotations along with accepted order description
 * Quotations which are rejected by the user
 * @description Rejected Quotations
 * @route GET/ api/vendor/rejectedQuotation
 */
vendorRouter.get('/rejectedQuotations', async (req: Request, res: Response) => {
  res.json({
    'Rejected Quotations':
      'Quotations sent by vendor which are not accepted. Along with the description of the accepted order',
  });
});

/**
 * To View the the Quotations which were Accepted by the customers
 * @description Accepted Quotations
 * @route GET/ api/vendor/acceptedQuotation
 */
vendorRouter.get('/acceptedQuotations', async (req: Request, res: Response) => {
  res.json({
    'Accepted Quotations': 'Quotations of the vendors accepted by the customers',
  });
});

// ------------------------- Order Routes ----------------------- //

/**
 * Completed Orders List
 * @description Completed Orders
 * @route GET/ api/vendor/completedOrders
 */
vendorRouter.get('/completedOrders', async (req: Request, res: Response) => {
  res.json({
    'Complted Orders': 'Completed Orders',
  });
});

// Future Scope
// Get Request for the Orders yet to be delivered to the customers

// Export the Formed Router
export default vendorRouter;
