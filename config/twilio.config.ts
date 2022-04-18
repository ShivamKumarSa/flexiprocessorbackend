import twilio from 'twilio';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID as string;
const authToken = process.env.TWILIO_AUTH_TOKEN as string;
const client = new twilio.Twilio(accountSid, authToken);

export default client;
