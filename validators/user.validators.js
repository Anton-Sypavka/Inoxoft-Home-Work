const Joi = require('joi');

const { EMAIL_REGEXP, PASSWORD_REGEXP } = require('../configs/constants');
const userRoles = require('../configs/userRoles');

const createUserValidator = Joi.object({
    name: Joi
        .string()
        .alphanum()
        .min(3)
        .max(30)
        .trim()
        .required(),

    password: Joi
        .string()
        .regex(PASSWORD_REGEXP)
        .trim()
        .required(),

    email: Joi
        .string()
        .regex(EMAIL_REGEXP)
        .trim()
        .required(),

    role: Joi
        .string()
        .allow(...Object.values(userRoles))
});

const updateUserValidator = Joi.object({
    name: Joi
        .string()
        .alphanum()
        .min(3)
        .max(30)
        .trim(),

    password: Joi
        .string()
        .regex(PASSWORD_REGEXP)
        .trim(),

    email: Joi
        .string()
        .regex(EMAIL_REGEXP)
        .trim(),

    role: Joi
        .string()
        .allow(...Object.values(userRoles))
});

const getUserByIdValidator = Joi.object({
    user_id: Joi
        .string()
        .min(24)
        .max(24)
        .trim(),
});

const passwordValidator = Joi.object({
    password: Joi
        .string()
        .regex(PASSWORD_REGEXP)
        .trim(),
});

module.exports = {
    createUserValidator,
    updateUserValidator,
    getUserByIdValidator,
    passwordValidator
};
