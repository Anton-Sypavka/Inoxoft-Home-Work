const jwt = require('jsonwebtoken');

const {
    ACCESS_TOKEN_TYPE,
    REFRESH_TOKEN_TYPE,
    RECOVERY_TOKEN_TYPE,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
    RECOVERY_TOKEN_SECRET
} = require('../configs/config');
const ErrorHandler = require('../errors/errorHandler');
const { UNAUTHORIZED } = require('../configs/errorCodes.enum');

module.exports = {
    generateTokenPair: () => {
        const accessToken = jwt.sign({}, ACCESS_TOKEN_SECRET, { expiresIn: '60m' });
        const refreshToken = jwt.sign({}, REFRESH_TOKEN_SECRET, { expiresIn: '31d' });

        return {
            accessToken,
            refreshToken
        };
    },

    generateRecoveryToken: () => jwt.sign({}, RECOVERY_TOKEN_SECRET, { expiresIn: '1d' }),

    verifyToken: (token, tokenType = 'access') => {
        let word = '';

        switch (tokenType) {
            case ACCESS_TOKEN_TYPE:
                word = ACCESS_TOKEN_SECRET;
                break;
            case REFRESH_TOKEN_TYPE:
                word = REFRESH_TOKEN_SECRET;
                break;
            case RECOVERY_TOKEN_TYPE:
                word = RECOVERY_TOKEN_SECRET;
                break;
        }

        return jwt.verify(token, word);
    }
};
