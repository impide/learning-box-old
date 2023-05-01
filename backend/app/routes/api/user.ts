import express from 'express';
import { userController as controller } from '../../controllers/api/index';
import controllerWrapper from '../../helpers/controllerWrapper';

const router = express.Router();

router.post('/signup', controllerWrapper(controller.signup));

router.post('/login', controllerWrapper(controller.login));

export default router;
