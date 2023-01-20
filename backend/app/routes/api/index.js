import express from 'express';

import adminRouter from './admin.js';
import teacherRouter from './teacher.js';
import userRouter from './user.js';
import courseRouter from './course.js';
import categoryRouter from './category.js';

import { apiController } from '../../controllers/api/index.js';

import errorHandler from '../../helpers/errorHandler.js';

// This index is used for route management (API) and links to the controllers.
const router = express.Router();

// Default route of the API, here we configure it for all methods
// to give information in case the user forgets to specify the route
router.all('/', apiController.home);

router.use('/admins', adminRouter);

router.use('/teachers', teacherRouter);

router.use('/users', userRouter);

router.use('/courses', courseRouter);

router.use('/categories', categoryRouter);

router.use(errorHandler('json'));

export default router;
