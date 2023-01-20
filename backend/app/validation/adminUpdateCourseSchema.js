import Joi from 'joi';

export default Joi.object({
    label: Joi.string().min(5),
    course_description: Joi.string().min(10),
}).min(1);
