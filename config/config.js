module.exports = {
    MONGO_URL: process.env.MONGO_CONNECT_URL || 'mongodb://localhost:27017/june-2021',
    PORT: process.env.PORT || 7000,

    JWT_SECRET: process.env.JWT_SECRET || 'Secret_key',
    ACCESS_TOKEN_LIFETIME: process.env.ACCESS_TOKEN_LIFETIME || '20m',

    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'Refresh_secret_key',
    REFRESH_TOKEN_LIFETIME: process.env.REFRESH_TOKEN_LIFETIME || '30d',

    EMAIL_SERVICE: process.env.SERVER || 'gmail',
    EMAIL_USER: process.env.EMAIL_USER || 'email@gmail.com',
    EMAIL_PASS: process.env.EMAIL_PASS || '777',
};
