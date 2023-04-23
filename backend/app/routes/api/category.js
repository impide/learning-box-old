import express from 'express';

import { categoryController as controller } from '../../controllers/api/index.js';
import controllerWrapper from '../../helpers/controllerWrapper.js';

const router = express.Router();

// Retrieve all Categories
router.get('/', controllerWrapper(controller.getAll));

export default router;
