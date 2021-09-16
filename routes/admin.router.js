const express = require('express');

const { adminController } = require('../controllers');
const { userMiddleware } = require('../middlewares');

const router = express.Router();

router.use('*', userMiddleware.isAdmin,);

router.route('/create-user-by-admin')
    .post(
        userMiddleware.isEmailUnique,
        adminController.createUserByAdmin
    );

module.exports = router;
