module.exports = {
    PORT: process.env.PORT || 5000,
    DATABASE: process.env.DB_CONNECTION_URL || 'mongodb://localhost:27017/inoxoft',

    ACCESS_TOKEN_TYPE: 'access',
    REFRESH_TOKEN_TYPE: 'refresh',
    RECOVERY_TOKEN_TYPE: 'recovery',

    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'word',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'secret_word',
    RECOVERY_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'secret_word_for_recovery_password',

    EMAIL_ACCOUNT_ADDRESS: process.env.EMAIL_ACCOUNT_ADDRESS || 'no-reply@gmail.com',
    EMAIL_ACCOUNT_PASSWORD: process.env.EMAIL_ACCOUNT_PASSWORD || '123*****',

    FRONTEND_URL: process.env.FRONTEND_URL || 'google.com',

    AWS_S3_REGION: process.env.AWS_S3_REGION,
    AWS_S3_NAME: process.env.AWS_S3_NAME,
    AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
    AWS_PRIVAT_KEY: process.env.AWS_PRIVAT_KEY,

    ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || 'localhost:3000;localhost:8080'
};
