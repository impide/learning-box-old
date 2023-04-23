import express from 'express';

import { courseController as controller } from '../../controllers/api/index.js';
import controllerWrapper from '../../helpers/controllerWrapper.js';

const router = express.Router();

// Retrieve all Courses (With Categories)
router.get('/', controllerWrapper(controller.getAll));

//  Retrieve one Course by Course Id
router.get('/:courseId', controllerWrapper(controller.getOneCourse));

export default router;
