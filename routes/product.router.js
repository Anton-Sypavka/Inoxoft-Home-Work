const express = require('express');

const { productMiddleware, authMiddleware } = require('../middlewares');
const { productController } = require('../controllers');

const router = express.Router();

router.route('/')
    .get(
        productController.getAllProducts
    )
    .post(
        authMiddleware.checkToken(),
        productMiddleware.isCreateProductDataValid,
        productController.createProduct
    );

router.use(
    '/:product_id',
    productMiddleware.isProductIdValid,
    productMiddleware.getProductByDynamicParam('product_id', 'params', '_id')
);

router.route('/:product_id')
    .get(
        productController.getProductById
    )
    .patch(
        authMiddleware.checkToken(),
        productMiddleware.isUpdateProductDataValid,
        productController.updateProduct
    )
    .delete(
        authMiddleware.checkToken(),
        productController.deleteProductById
    );

module.exports = router;
