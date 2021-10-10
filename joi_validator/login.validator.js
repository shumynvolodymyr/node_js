const Joi = require('joi');

const {PASSWORD_REGEXP} = require('../config/regexp');

module.exports = {
    authDataValidator: Joi.object({
        brand: Joi
            .string()
            .required()
            .trim(),
        password: Joi
            .string()
            .required()
            .trim()
            .min(8)
            .max(128)
            .regex(PASSWORD_REGEXP)
    }),
};
