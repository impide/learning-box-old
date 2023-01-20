import Joi from 'joi';

export default Joi.object({
    title: Joi.string().min(5).required(),
    description: Joi.string().min(10).required(),
}).required();
