import express from 'express';
import apiRouter from './api/index.js';
import stripeRouter from './stripe/index.js';
import websiteRouter from './website/index.js';

// This index is used for the management of route files: API or Website

const router = express.Router();

// Prefix Routers
router.use('/api', apiRouter);

router.use('/stripe', stripeRouter);

router.use('/website', websiteRouter);

export default router;
