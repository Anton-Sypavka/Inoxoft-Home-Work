const Joi = require('joi');

const createProductValidator = Joi.object({
    name: Joi
        .string()
        .min(3)
        .max(30)
        .trim()
        .required(),

    description: Joi
        .string()
        .trim()
        .required(),

    price: Joi
        .number()
        .integer()
        .required()
});

const updateProductValidator = Joi.object({
    name: Joi
        .string()
        .min(3)
        .max(30)
        .trim(),

    description: Joi
        .string()
        .trim(),

    price: Joi
        .number()
        .integer()
});

const getProductByIdValidator = Joi.object({
    product_id: Joi
        .string()
        .min(24)
        .max(24)
        .trim(),
});

module.exports = {
    createProductValidator,
    updateProductValidator,
    getProductByIdValidator
};
