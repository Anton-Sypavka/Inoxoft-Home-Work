const { userNormalizator } = require('../utils/user.util');
const { jwtService } = require('../services');
const { ActionToken, User } = require('../models');
const { emailService, passwordService } = require('../services');
const { ACCOUNT_CREATED_BY_ADMIN } = require('../configs/constants');
const { FRONTEND_URL } = require('../configs/config');

module.exports = {
    createUserByAdmin: async (req, res, next) => {
        try {
            const { body } = req;

            const temporaryToken = jwtService.generateRecoveryToken();

            const password = passwordService.generateTemporaryPassword();

            const newUser = await User.create({
                ...body,
                password
            });

            await ActionToken.create({ token: temporaryToken, user: newUser._id });

            await emailService.sendMail(
                newUser.email,
                ACCOUNT_CREATED_BY_ADMIN,
                {
                    userName: newUser.name,
                    recoveryLink: `${FRONTEND_URL}/forgot-password?token=${temporaryToken}`
                }
            );

            res.json({
                message: 'User created',
                data: {
                    user: userNormalizator(newUser)
                }
            });
        } catch (e) {
            next(e);
        }
    }
};
