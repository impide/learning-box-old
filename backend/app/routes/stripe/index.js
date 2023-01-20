import express from 'express';

import paymentRouter from './payment.js';

import { stripeController } from '../../controllers/stripe/index.js';

import errorHandler from '../../helpers/errorHandler.js';

// This index is used for route management (Stripe) and links to the controllers.
const router = express.Router();

router.all('/', stripeController.home);

router.use('/payments', paymentRouter);

router.use(errorHandler('json'));

export default router;
