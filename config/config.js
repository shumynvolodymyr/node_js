module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'dev',

    BASE_URL: process.env.BASE_URL || 'http://localhost:7000/',
    ACTIVATE_URL: 'http://localhost:7000/auth/activate/',
    FORGOT_PASSWORD_URL: 'http://localhost:7000/auth/password/forgot/',
    MONGO_URL: process.env.MONGO_CONNECT_URL || 'mongodb://localhost:27017/june-2021',
    PORT: process.env.PORT || 7000,

    JWT_SECRET: process.env.JWT_SECRET || 'Secret_key',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'Refresh_secret_key',
    JWT_ACTION_SECRET: process.env.JWT_ACTION_SECRET || 'action_secret_key',
    JWT_ACTION_SECRET_FORGOT: process.env.JWT_ACTION_SECRET_FORGOT || 'action_secret_forgot_key',

    ACCESS_TOKEN_LIFETIME: process.env.ACCESS_TOKEN_LIFETIME || '20m',
    REFRESH_TOKEN_LIFETIME: process.env.REFRESH_TOKEN_LIFETIME || '30d',
    ACTION_TOKEN_LIFETIME: process.env.ACTION_TOKEN_LIFETIME || '1d',

    EMAIL_SERVICE: process.env.SERVER || 'gmail',
    EMAIL_USER: process.env.EMAIL_USER || 'email@gmail.com',
    EMAIL_PASS: process.env.EMAIL_PASS || '777',

    ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'admin@gmail.com',
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || '777HnL77',

    ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || 'http://localhost:7000',
};
