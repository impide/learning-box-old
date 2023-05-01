import express from 'express';
import { courseController as controller } from '../../controllers/api/index';
import controllerWrapper from '../../helpers/controllerWrapper';

const router = express.Router();

router.get('/', controllerWrapper(controller.getAll));

router.get('/:courseId', controllerWrapper(controller.getOne));

export default router;
