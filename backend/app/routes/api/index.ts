import express from 'express';
import userRouter from './user';
import courseRouter from './course';
import categoryRouter from './category';
import errorHandler from '../../helpers/errorHandler';

const router = express.Router();

router.use('/users', userRouter);

router.use('/courses', courseRouter);

router.use('/categories', categoryRouter);

router.use(errorHandler('json'));

export default router;
