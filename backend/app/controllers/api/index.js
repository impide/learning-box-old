const apiController = {
    // Default API controller to show documentation url.
    home(req, res) {
        const fullUrl = `${req.protocol}://${req.get('host')}`;
        return res.json({
            documentation_url: `${fullUrl}/docs`,
        });
    },
};

export { apiController };
export { default as adminController } from './admin.js';
export { default as teacherController } from './teacher.js';
export { default as userController } from './user.js';
export { default as courseController } from './course.js';
export { default as categoryController } from './category.js';
