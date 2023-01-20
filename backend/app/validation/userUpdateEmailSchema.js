import Joi from 'joi';

export default Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } }).required(),
    password: Joi.string()
        .required()
        .regex(/^[a-zA-Z0-9]{3,30}$/),
}).required();
