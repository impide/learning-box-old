import Joi from 'joi';

export default Joi.object({
    comment: Joi.string().min(4).required(),
}).required();
