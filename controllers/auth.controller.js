const { emailService } = require('../services');
const { FRONTEND_URL } = require('../configs/config');
const { LOGOUT, RECOVERY_MAIL } = require('../configs/constants');
const { NO_CONTENT } = require('../configs/errorCodes.enum');
const { OAuth, User, ActionToken } = require('../models');
const { passwordService, jwtService } = require('../services');
const { userNormalizator } = require('../utils/user.util');

module.exports = {
    login: async (req, res, next) => {
        try {
            const { user, body } = req;

            await passwordService.compare(body.password, user.password);

            const newTokenPair = jwtService.generateTokenPair();

            await OAuth.create({ ...newTokenPair, user: user.id });

            const normalizedUser = userNormalizator(user);

            res.json({
                ...newTokenPair,
                normalizedUser
            });
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const { currentUser } = req;
            const token = req.get('Authorization');

            await OAuth.findOneAndDelete({ accessToken: token });

            await emailService.sendMail(currentUser.email, LOGOUT, { userName: currentUser.name });

            res.status(NO_CONTENT).json({
                message: 'User Logged Out'
            });
        } catch (e) {
            next(e);
        }
    },

    refresh: async (req, res, next) => {
        try {
            const token = req.get('Authorization');

            const newTokenPair = jwtService.generateTokenPair();

            const user = await OAuth.findOneAndUpdate({ refreshToken: token }, newTokenPair).populate('user');

            const normalizedUser = userNormalizator(user);

            res.json({
                message: 'ok',
                data: {
                    normalizedUser
                }
            });
        } catch (e) {
            next(e);
        }
    },

    sendPasswordRecoveryMail: async (req, res, next) => {
        try {
            const { user: { email } } = req;

            const passwordRecoveryToken = jwtService.generateRecoveryToken();

            const userFromDB = await User.findOne({ email });

            await ActionToken.create({ token: passwordRecoveryToken, user: userFromDB._id });

            await emailService.sendMail(
                userFromDB.email,
                RECOVERY_MAIL,
                {
                    userName: userFromDB.name,
                    recoveryLink: `${FRONTEND_URL}/forgot-password?token=${passwordRecoveryToken}`
                }
            );

            res.json({
                message: 'Email was sent',
            });
        } catch (e) {
            next(e);
        }
    },

    setUserPassword: async (req, res, next) => {
        try {
            const token = req.get('Authorization');
            const { currentUser: { _id }, body: { password } } = req;

            const hashedPassword = await passwordService.hash(password);
            await ActionToken.deleteOne({ token });
            const updatedUser = await User.findByIdAndUpdate(_id, { password: hashedPassword });

            res.json({
                message: 'Password has been set',
                data: {
                    user: userNormalizator(updatedUser)
                }
            });
        } catch (e) {
            next(e);
        }
    }
};
