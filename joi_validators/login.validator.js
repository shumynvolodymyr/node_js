const Joi = require('joi');

const {constants: {PASSWORD_REGEXP}} = require('../config');

const userAuthValidator = Joi.object({
    login: Joi
        .string()
        .required()
        .alphanum()
        .min(3)
        .max(32),
    password: Joi
        .string()
        .regex(PASSWORD_REGEXP)
        .min(8)
        .max(128)
        .required()
        .trim(),
});

const passwordValidator = Joi.object({
    password: Joi
        .string()
        .regex(PASSWORD_REGEXP)
        .min(8)
        .max(128)
        .required()
        .trim(),
});

module.exports = {userAuthValidator, passwordValidator};
