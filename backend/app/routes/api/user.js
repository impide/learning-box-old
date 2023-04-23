import express from 'express';

import validate from '../../validation/validator.js';
import userUpdatePseudoSchema from '../../validation/userUpdatePseudoSchema.js';
import userUpdateEmailSchema from '../../validation/userUpdateEmailSchema.js';
import userSignupSchema from '../../validation/userSignupSchema.js';
import userAddCommentSchema from '../../validation/userAddCommentSchema.js';
import userAddNotSchema from '../../validation/userAddNoteSchema.js';

import { userController as controller } from '../../controllers/api/index.js';
import uploadAvatar from '../../helpers/multer/multer-avatar.js';
import controllerWrapper from '../../helpers/controllerWrapper.js';

const router = express.Router();

// Get Users
router.get('/', controllerWrapper(controller.getAll));

// Signup
router.post('/signup', validate('body', userSignupSchema), controllerWrapper(controller.signup));

// Login
router.post('/login', controllerWrapper(controller.login));

// Add Course to Favorite
router.get('/:userId/add-favorite/:courseId', controllerWrapper(controller.addToFavorite));

// Add Comment
router.post('/:userId/add-comment/:courseId', validate('body', userAddCommentSchema), controllerWrapper(controller.addOneComment));

// Add Note
router.post('/:userId/add-note/:courseId', validate('body', userAddNotSchema), controllerWrapper(controller.addOneNote));

// Update User Avatar (Testing with Insomnia)
router.put('/update-avatar/:userId', uploadAvatar, controllerWrapper(controller.updateOneAvatar));

// Update Pseudo
router.put('/update-pseudo/:userId', validate('body', userUpdatePseudoSchema), controllerWrapper(controller.updateOnePseudo));

// Update Email
router.put('/update-email/:userId', validate('body', userUpdateEmailSchema), controllerWrapper(controller.updateOneEmail));

// Forgot Password
router.post('/forgot-password', controllerWrapper(controller.forgotPassword));

// Reset Password
router.route('/reset-password/:userId/:token')
    .get(controllerWrapper(controller.resetPassword))
    .post(controllerWrapper(controller.updatePassword));

// Delete Account
router.delete('/deleteAccount/:userId', controllerWrapper(controller.deleteAccount));

export default router;
