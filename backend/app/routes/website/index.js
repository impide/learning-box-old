import express from 'express';

import documentationRouter from './documentation.js';
// WebsiteController is the main Method in Controller.Website.Index.js
import { websiteController } from '../../controllers/website/index.js';

import controllerWrapper from '../../helpers/controllerWrapper.js';
import errorHandlerFactory from '../../helpers/errorHandler.js';
import { NotFoundError } from '../../helpers/errorClasses/errorClasses.js';

const router = express.Router();

router.get('/', controllerWrapper(websiteController.home));

router.use('/docs', documentationRouter);

router.use((_, __, next) => {
    next(new NotFoundError('Page not found'));
});

router.use(errorHandlerFactory('html'));

export default router;
