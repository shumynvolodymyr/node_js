const Joi = require('joi');

const {EMAIL_REGEXP, PASSWORD_REGEXP} = require('../config/constants');
const userRoles = require('../config/user_roles.enum');

const createUserValidator = Joi.object({
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
    email: Joi
        .string()
        .regex(EMAIL_REGEXP)
        .trim()
        .required()
        .min(5)
        .max(255),
    role: Joi
        .string()
        .allow(...Object.values(userRoles))
});

const updateUserValidator = Joi.object({
    password: Joi
        .string()
        .regex(PASSWORD_REGEXP)
        .min(8)
        .max(128)
        .required()
        .trim(),
});

module.exports = {createUserValidator, updateUserValidator};
