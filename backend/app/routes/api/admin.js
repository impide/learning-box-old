import express from 'express';

import validate from '../../validation/validator.js';
import createCategorySchema from '../../validation/adminCreateCategorySchema.js';
import updateCategorySchema from '../../validation/adminUpdateCategorySchema.js';
import updateCourseSchema from '../../validation/adminUpdateCourseSchema.js';

import { adminController as controller } from '../../controllers/api/index.js';
import controllerWrapper from '../../helpers/controllerWrapper.js';

const router = express.Router();

// Add Category
router.post('/category/:adminId/:parentId', validate('body', createCategorySchema), controllerWrapper(controller.addOneCategory));

// Update Category
router.patch('/:adminId/category/:categoryId', validate('body', updateCategorySchema), controllerWrapper(controller.updateOneCategory));

// Update a Course Partially of Another Teacher
router.patch('/:adminId/courseTeacher/:courseId', validate('body', updateCourseSchema), controllerWrapper(controller.updateOneCourseByAdmin));

// Delete Course of Another Teacher
router.delete('/:adminId/courseTeacher/:courseId', controllerWrapper(controller.deleteOneCourseByAdmin));

// Delete one Category
router.delete('/:adminId/category/:categoryId', controllerWrapper(controller.deleteOneCategory));

export default router;
