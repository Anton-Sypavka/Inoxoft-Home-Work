const { CREATED } = require('../configs/errorCodes.enum');
const { fileService, passwordService, emailService } = require('../services');
const { User } = require('../models');
const { userNormalizator } = require('../utils/user.util');
const { WELCOME } = require('../configs/constants');

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await User.find({});

            const normalizedUsers = users.map((user) => userNormalizator(user));

            res
                .json({
                    status: 'success',
                    results: users.length,
                    data: {
                        normalizedUsers
                    }
                });
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const { password, name } = req.body;

            const hashPassword = await passwordService.hash(password);

            let newUser = await User.create({
                ...req.body,
                password: hashPassword
            });

            if (req.files && req.files.avatar) {
                const { _id } = newUser;
                const { avatar } = req.files;
                const uploadFile = await fileService.upload(avatar, 'user', _id);

                newUser = await User.findByIdAndUpdate(_id, { avatar: uploadFile.Location }, { new: true });
            }

            const normalizedUser = userNormalizator(newUser);

            await emailService.sendMail(normalizedUser.email, WELCOME, { userName: name });

            res
                .status(CREATED)
                .json({
                    status: 'success',
                    data: {
                        normalizedUser
                    }
                });
        } catch (e) {
            next(e);
        }
    },

    getUserById: (req, res, next) => {
        try {
            const { user } = req;

            const normalizedUser = userNormalizator(user);

            res
                .json({
                    status: 'success',
                    data: {
                        normalizedUser
                    }
                });
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { user } = req;

            const updatedUser = await User.findByIdAndUpdate(user.id, req.body, {
                new: true,
                runValidators: true
            });

            const normalizedUser = userNormalizator(updatedUser);

            res
                .json({
                    status: 'success',
                    data: {
                        normalizedUser
                    }
                });
        } catch (e) {
            next(e);
        }
    },

    deleteUserById: async (req, res, next) => {
        try {
            const { user } = req;

            await User.findByIdAndDelete(user.id);

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
