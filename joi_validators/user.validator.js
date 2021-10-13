const Joi = require('joi');

const {constants: {EMAIL_REGEXP, PASSWORD_REGEXP}} = require('../config');
const {userRolesEnum} = require('../config');

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
    name: Joi
        .string()
        .required()
        .trim()
        .min(3)
        .max(128),
    age: Joi
        .number()
        .min(3)
        .max(128)
    ,
    email: Joi
        .string()
        .regex(EMAIL_REGEXP)
        .trim()
        .required()
        .min(5)
        .max(255),
    picture: Joi
        .string()
        .trim()
    ,
    role: Joi
        .string()
        .allow(...Object.values(userRolesEnum))
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
