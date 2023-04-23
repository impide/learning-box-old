import Joi from 'joi';

export default Joi.object({
    pseudo: Joi.string()
        .alphanum()
        .min(3)
        .max(10)
        .required(),
}).required();
