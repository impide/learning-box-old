import express from 'express';

// Documentation Controller is one of the different Export in Controller.Website.Index.js
import { documentationController as controller } from '../../controllers/website/index.js';
import controllerWrapper from '../../helpers/controllerWrapper.js';

const router = express.Router();

// Retrieve all Docs
router.get('/', controllerWrapper(controller.getDocs));

export default router;
