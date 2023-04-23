import Joi from 'joi';

export default Joi.object({
    note: Joi.number().min(1).required(),
}).required();
