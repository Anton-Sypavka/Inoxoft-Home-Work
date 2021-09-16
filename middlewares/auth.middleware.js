const { ACCESS_TOKEN_TYPE } = require('../configs/config');
const { BAD_REQUEST } = require('../configs/errorCodes.enum');
const ErrorHandler = require('../errors/errorHandler');
const { jwtService } = require('../services');
const { OAuth } = require('../models');
const { UNAUTHORIZED } = require('../configs/errorCodes.enum');
const { userValidators: { passwordValidator } } = require('../validators');

module.exports = {
    checkToken: (tokenType = ACCESS_TOKEN_TYPE, tokenFieldInDB = 'accessToken', Model = OAuth) => async (req, res, next) => {
        try {
            const token = req.get('Authorization');

            if (!token) {
                throw new ErrorHandler(UNAUTHORIZED, 'Token not found');
            }

            await jwtService.verifyToken(token, tokenType);

            const tokenFromDB = await Model.findOne({ [tokenFieldInDB]: token }).populate('user');

            if (!tokenFromDB) {
                throw new ErrorHandler(UNAUTHORIZED, 'Invalid token');
            }

            req.currentUser = tokenFromDB.user;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkPassword: (req, res, next) => {
        try {
            const { error } = passwordValidator.validate(req.body);

            if (error) throw new ErrorHandler(BAD_REQUEST, error.details[0].message);

            next();
        } catch (e) {
            next(e);
        }
    }
};
