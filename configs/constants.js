module.exports = {
    PASSWORD_REGEXP: new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,128})/),
    EMAIL_REGEXP: new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'),

    WELCOME: 'welcome',
    LOGOUT: 'logout',
    RECOVERY_MAIL: 'recovery',
    ACCOUNT_CREATED_BY_ADMIN: 'accountCreatedByAdmin',

    MAX_AVATAR_SIZE: 5 * 1024 * 1024
};
