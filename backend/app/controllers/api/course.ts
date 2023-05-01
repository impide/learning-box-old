import { Request, Response } from 'express';
import CourseServices from '../../services/course';
import { Course } from '@prisma/client';

export default {
    async getAll(_req: Request, res: Response) {
        const courses: Course[] = await CourseServices.findAll();

        return res.status(200).json({
            status: 200,
            result: courses,
        });
    },

    async getOne(req: Request, res: Response): Promise<Response> {
        const courseId = parseInt(req.params.courseId, 10);
        const course: Course = await CourseServices.findOneById(courseId);

        if (course)
            return res.status(200).json({
                status: 200,
                result: course,
            });
    },
};
