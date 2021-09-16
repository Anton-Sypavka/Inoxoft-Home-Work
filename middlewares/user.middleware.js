const { CONFLICT, NOT_FOUND, BAD_REQUEST } = require('../configs/errorCodes.enum');
const ErrorHandler = require('../errors/errorHandler');
const { User, OAuth } = require('../models');
const {
    userValidators: {
        createUserValidator,
        updateUserValidator,
        getUserByIdValidator
    }
} = require('../validators');

module.exports = {
    isEmailUnique: async (req, res, next) => {
        try {
            const { email } = req.body;

            const userByEmail = await User.findOne({ email: email.trim() });

            if (userByEmail) {
                throw new ErrorHandler(CONFLICT, 'Such email is already exists');
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isCreateUserDataValid: (req, res, next) => {
        try {
            const { error } = createUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUpdateUserDataValid: (req, res, next) => {
        try {
            const { error } = updateUserValidator.validate(req.body);

            if (error) throw new ErrorHandler(BAD_REQUEST, error.details[0].message);

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserIdValid: (req, res, next) => {
        try {
            const { error } = getUserByIdValidator.validate(req.params);

            if (error) {
                throw new ErrorHandler(BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isAdmin: async (req, res, next) => {
        try {
            const accessToken = req.get('Authorization');

            const admin = await OAuth.findOne({ accessToken }).populate('user');

            if (admin.user.role !== 'admin') {
                throw new ErrorHandler(BAD_REQUEST, 'You are not allowed to create a user');
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    getUserByDynamicParam: (paramName, searchIn = 'body', dbField = paramName) => async (req, res, next) => {
        try {
            const value = req[searchIn][paramName];

            const user = await User.findOne({ [dbField]: value });

            if (!user) throw new ErrorHandler(NOT_FOUND, 'User not found');

            req.user = user;

            next();
        } catch (err) {
            next(err);
        }
    },

    getExactUsers: (param, field) => async (req, res, next) => {
        try {
            const users = await User.find({ [param]: field });

            if (users.length === 0) throw new ErrorHandler(NOT_FOUND, 'Users not found');

            req.users = users;

            next();
        } catch (e) {
            next(e);
        }
    },
};
