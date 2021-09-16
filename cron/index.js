const cron = require('node-cron');

const removeOldTokens = require('./removeOldTokens');

module.exports = () => {
    cron.schedule('59 12 * * *', () => {
        removeOldTokens();
    });
};
