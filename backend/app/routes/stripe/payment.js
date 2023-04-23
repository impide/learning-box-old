import express from 'express';

import { paymentController as controller } from '../../controllers/stripe/index.js';
import controllerWrapper from '../../helpers/controllerWrapper.js';

const router = express.Router();

// Create Payment
router.get('/:userId/create-payment-intent/:courseId', controllerWrapper(controller.createPayment));

export default router;
