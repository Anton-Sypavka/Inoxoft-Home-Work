const ErrorHandler = require('../errors/errorHandler');
const { NOT_FOUND, BAD_REQUEST } = require('../configs/errorCodes.enum');
const { Product } = require('../models');

const {
    productValidators: {
        createProductValidator,
        updateProductValidator,
        getProductByIdValidator
    }
} = require('../validators');

module.exports = {
    isProductByIdExist: async (req, res, next) => {
        try {
            const { product_id } = req.params;

            const product = await Product.findById(product_id);

            if (!product) {
                throw new ErrorHandler(NOT_FOUND, 'Product not found');
            }

            req.product = product;

            next();
        } catch (err) {
            next(err);
        }
    },

    isCreateProductDataValid: (req, res, next) => {
        try {
            const { error } = createProductValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUpdateProductDataValid: (req, res, next) => {
        try {
            const { error } = updateProductValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isProductIdValid: (req, res, next) => {
        try {
            const { error } = getProductByIdValidator.validate(req.params);

            if (error) {
                throw new ErrorHandler(BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    getProductByDynamicParam: (paramName, searchIn = 'body', dbField = paramName) => async (req, res, next) => {
        try {
            const value = req[searchIn][paramName];

            const product = await Product.findOne({ [dbField]: value }).populate('user');

            if (!product) throw new ErrorHandler(NOT_FOUND, 'Product not found');

            req.product = product;

            next();
        } catch (err) {
            next(err);
        }
    },
};
