const dayjs = require('dayjs');

const { OAuth, ActionToken } = require('../models');

module.exports = async () => {
    const previousMonth = dayjs().subtract(1, 'month');

    await OAuth.deleteMany({ createdAt: { $lte: previousMonth } });
    await ActionToken.deleteMany({ createdAt: { $lte: previousMonth } });
};
