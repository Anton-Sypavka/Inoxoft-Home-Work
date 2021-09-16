const express = require('express');

const { authMiddleware, userMiddleware, fileMiddleware } = require('../middlewares');
const { userController } = require('../controllers');

const router = express.Router();

router.route('/')
    .get(
        userController.getAllUsers
    )
    .post(
        userMiddleware.isCreateUserDataValid,
        fileMiddleware.checkUserAvatar,
        userMiddleware.isEmailUnique,
        userController.createUser
    );

router.route('/admins')
    .get(
        userMiddleware.getExactUsers('role', 'admins'),
        userController.getAllUsers
    );

router.use(
    '/:user_id',
    userMiddleware.isUserIdValid,
    userMiddleware.getUserByDynamicParam('user_id', 'params', '_id')
);

router.route('/:user_id')
    .get(
        userController.getUserById
    )
    .patch(
        userMiddleware.isUpdateUserDataValid,
        userController.updateUser
    )
    .delete(
        authMiddleware.checkToken(),
        userController.deleteUserById
    );

module.exports = router;
