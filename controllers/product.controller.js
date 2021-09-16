const ErrorHandler = require('../errors/errorHandler');
const { CONFLICT } = require('../configs/errorCodes.enum');
const { CREATED } = require('../configs/errorCodes.enum');
const { Product } = require('../models');

module.exports = {
    getAllProducts: async (req, res, next) => {
        try {
            const products = await Product.find({});

            res
                .json({
                    status: 'success',
                    results: products.length,
                    data: {
                        products
                    }
                });
        } catch (e) {
            next(e);
        }
    },

    createProduct: async (req, res, next) => {
        try {
            const { loggedUser, body } = req;
            const newProduct = await Product.create({ ...body, user: loggedUser._id });

            res
                .status(CREATED)
                .json({
                    status: 'success',
                    data: {
                        product: newProduct
                    }
                });
        } catch (e) {
            next(e);
        }
    },

    getProductById: (req, res, next) => {
        try {
            const { product } = req;

            res
                .json({
                    status: 'success',
                    data: {
                        product
                    }
                });
        } catch (e) {
            next(e);
        }
    },

    updateProduct: async (req, res, next) => {
        try {
            const { product, loggedUser } = req;

            if (!product.user._id.equals(loggedUser._id)) {
                throw new ErrorHandler(CONFLICT, 'You are not allowed to edit this product');
            }

            const updatedProduct = await Product.findByIdAndUpdate(product.id, req.body, {
                new: true,
                runValidators: true
            });

            res
                .json({
                    status: 'success',
                    data: {
                        product: updatedProduct
                    }
                });
        } catch (e) {
            next(e);
        }
    },

    deleteProductById: async (req, res, next) => {
        try {
            const { product, loggedUser } = req;

            if (!product.user._id.equals(loggedUser._id)) {
                throw new ErrorHandler(CONFLICT, 'You are not allowed to delete this product');
            }

            await Product.findByIdAndDelete(product.id);

            res
                .status(204)
                .json({
                    status: 'success',
                    data: null
                });
        } catch (e) {
            next(e);
        }
    }
};
