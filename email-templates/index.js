const {
    WELCOME, LOGOUT, RECOVERY_MAIL, ACCOUNT_CREATED_BY_ADMIN
} = require('../configs/constants');

module.exports = {

    [WELCOME]: {
        emailTemplateName: 'welcomeEmail',
        subject: 'Thank you for registration'
    },

    [LOGOUT]: {
        emailTemplateName: 'logoutEmail',
        subject: 'Logout notification'
    },

    [RECOVERY_MAIL]: {
        emailTemplateName: 'forgotPassword',
        subject: 'Super Duper Web Site Password Recovery'
    },

    [ACCOUNT_CREATED_BY_ADMIN]: {
        emailTemplateName: 'accountCreatedByAdmin',
        subject: 'Account Created By Admin'
    }
};
