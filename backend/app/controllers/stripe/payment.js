import Stripe from 'stripe';
import userDataMapper from '../../models/user.js';
import teacherDataMapper from '../../models/teacher.js';

import { NotFoundError } from '../../helpers/errorClasses/errorClasses.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default {
    // Create new Payment on Stripe
    async createPayment(req, res) {
        const userId = parseInt(req.params.userId, 10);
        const courseId = parseInt(req.params.courseId, 10);

        const user = await userDataMapper.findOneUserByUserId(userId);
        if (!user) {
            throw new NotFoundError('User not found');
        }

        const course = await teacherDataMapper.findOneCourseByCourseId(courseId);
        if (!course) {
            throw new NotFoundError('This course does not exists');
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: course.price * 100,
            currency: 'eur',
            description: `x1 ${course.label}`,
            statement_descriptor: `x1 ${course.label}`.substring(0, 22),
            metadata: {
                course_id: course.id,
                course_description: course.description,
                course_author: course.author,
                course_langage: course.language,
            },
        });

        return res.status(200).json({
            status: 200,
            result: paymentIntent,
        });
    },
};
