import Joi from 'joi';

export default Joi.object({
    label: Joi.string().min(5).required(),
    course_description: Joi.string().min(10).required(),
    language: Joi.string(),
    price: Joi.number().min(1).required(),
    teacher_id: Joi.number().integer().min(1).required(),
    category_id: Joi.number().integer().min(1).required(),
}).required();
