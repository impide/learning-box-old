import express from 'express';

import validate from '../../validation/validator.js';
import createCourseSchema from '../../validation/teacherCreateCourseSchema.js';
import updateCourseSchema from '../../validation/teacherUpdateCourseSchema.js';
import teacherAddCommentSchema from '../../validation/userAddCommentSchema.js';

import { teacherController as controller } from '../../controllers/api/index.js';
import uploadFile from '../../helpers/multer/multer-file.js';
import uploadAvatar from '../../helpers/multer/multer-avatar.js';
import controllerWrapper from '../../helpers/controllerWrapper.js';

const router = express.Router();

// Get all Teachers
router.get('/', controller.getAll);

// Add Course (Teacher & Admin) => (Testing with Insomnia)
router.post('/:teacherId/category/:categoryId', uploadFile, validate('body', createCourseSchema), controllerWrapper(controller.addCourse));

// Add Comment
router.post('/:teacherId/add-comment/:courseId', validate('body', teacherAddCommentSchema), controllerWrapper(controller.addOneComment));

// Update Course (Teacher & Admin) => (Testing with Insomnia)
router.patch('/:teacherId/courseTeacher/:courseId', uploadFile, validate('body', updateCourseSchema), controllerWrapper(controller.updateOneCourse));

// Update Avatar (Teacher & Admin) => (Testing with Insomnia)
router.put('/update-avatar/:teacherId', uploadAvatar, controllerWrapper(controller.updateOneAvatar));

// Delete Course (Teacher & Admin)
router.delete('/:teacherId/courseTeacher/:courseId', controllerWrapper(controller.deleteOneCourse));

// Delete Account (Teacher Only)
router.delete('/deleteAccount/:teacherId', controllerWrapper(controller.deleteAccount));

export default router;
