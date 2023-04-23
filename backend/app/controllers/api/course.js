import adminDataMapper from '../../models/admin.js';
import teacherDataMapper from '../../models/teacher.js';

export default {
    async getAll(req, res) {
        // Retrieves All Courses
        const courses = await adminDataMapper.findAllCourses();

        return res.status(200).json({
            status: 200,
            result: courses,
        });
    },

    async getOneCourse(req, res) {
        const courseId = parseInt(req.params.courseId, 10);

        // Retrieves one Course
        const course = await teacherDataMapper.findOneCourseByCourseId(courseId);

        return res.status(200).json({
            status: 200,
            result: course,
        });
    },
};
