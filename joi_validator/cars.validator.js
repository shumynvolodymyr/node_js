const Joi = require('joi');

const {PASSWORD_REGEXP} = require('../config/regexp');

module.exports = {
    createCarValidator: Joi.object({
        brand: Joi
            .string()
            .required()
            .trim(),
        model: Joi
            .string()
            .required()
            .trim(),
        year: Joi
            .number()
            .required()
            .min(1885)
            .max(1980),
        price: Joi
            .number()
            .required(),
        password: Joi
            .string()
            .required()
            .trim()
            .min(8)
            .max(128)
            .regex(PASSWORD_REGEXP)
    }),
};
