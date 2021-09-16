const ErrorHandler = require('../errors/errorHandler');
const { BAD_REQUEST } = require('../configs/errorCodes.enum');
const { MAX_AVATAR_SIZE } = require('../configs/constants');

module.exports = {
    checkUserAvatar: (req, res, next) => {
        try {
            if (!req.files || !req.files.avatar) {
                next();
                return;
            }

            const { avatar } = req.files;
            const { name, size } = avatar;

            if (size > MAX_AVATAR_SIZE) throw new ErrorHandler(BAD_REQUEST, `File ${ name } is to large!`);

            next();
        } catch (e) {
            next(e);
        }
    }
};
