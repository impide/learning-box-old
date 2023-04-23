import Joi from 'joi';

export default Joi.object({
    label: Joi.string().min(5),
    course_description: Joi.string().min(10),
    language: Joi.string(),
    price: Joi.number().precision(2).min(1),
}).min(1);
