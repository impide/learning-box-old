import Joi from 'joi';

export default Joi.object({
    title: Joi.string().min(5),
    description: Joi.string().min(10),
}).min(1);
