const jwt = require('jsonwebtoken');

const {config, ResponseStatusCodesEnum: {UNAUTHORIZED}, tokenTypesEnum: {ACCESS}} = require('../config');
const {ErrorHandler, messagesEnum: {INVALID_TOKEN}} = require('../errors');

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, config.JWT_SECRET, {expiresIn: config.ACCESS_TOKEN_LIFETIME});
        const refresh_token = jwt.sign({}, config.JWT_REFRESH_SECRET, {expiresIn: config.REFRESH_TOKEN_LIFETIME});
        return {
            access_token,
            refresh_token
        };
    },

    verifyToken: async (token, tokenType = 'access') => {
        try {
            const secret = tokenType === ACCESS ? config.JWT_SECRET : config.JWT_REFRESH_SECRET;

            await jwt.verify(token, secret);
        } catch (e) {
            throw new ErrorHandler(INVALID_TOKEN, UNAUTHORIZED);
        }
    }
};
