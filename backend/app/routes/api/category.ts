import express from 'express';
import { categoryController as controller } from '../../controllers/api/index';
import controllerWrapper from '../../helpers/controllerWrapper';

const router = express.Router();

router.get('/catalog', controllerWrapper(controller.getAll));

export default router;
