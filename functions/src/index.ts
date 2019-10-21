import * as functions from 'firebase-functions';
import * as auth from './auth';
import { api } from './api';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

export { basicSendEmail } from './send-email';

// Auth Functions
export const createStripeCustomer = auth.createStripeCustomer;

// Main Authenticated User API
export const app = api;