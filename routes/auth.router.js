const express = require('express');

const { ActionToken } = require('../models');
const { authController } = require('../controllers');
const { RECOVERY_TOKEN_TYPE } = require('../configs/config');
const { userMiddleware, authMiddleware } = require('../middlewares');

const router = express.Router();

router.route('/')
    .post(
        userMiddleware.getUserByDynamicParam('email'),
        authController.login
    );

router.route('/logout')
    .post(
        authMiddleware.checkToken(),
        authController.logout
    );

router.route('/refresh')
    .post(
        authMiddleware.checkToken('refresh', 'token'),
        authController.refresh
    );

router.route('/forgot-password/recovery')
    .post(
        userMiddleware.getUserByDynamicParam('email'),
        authController.sendPasswordRecoveryMail
    );

router.route('/set-password')
    .post(
        authMiddleware.checkToken(RECOVERY_TOKEN_TYPE, 'token', ActionToken),
        authMiddleware.checkPassword,
        authController.setUserPassword
    );

module.exports = router;
