const jwt = require('jsonwebtoken');

const {
    config,
    ResponseStatusCodesEnum: {UNAUTHORIZED, SERVER},
    tokenTypesEnum: {ACCESS, REFRESH, ACTION_TOKEN}
} = require('../config');
const {ErrorHandler, messagesEnum: {INVALID_TOKEN, WRONG_TOKEN_TYPE}} = require('../errors');

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, config.JWT_SECRET, {expiresIn: config.ACCESS_TOKEN_LIFETIME});
        const refresh_token = jwt.sign({}, config.JWT_REFRESH_SECRET, {expiresIn: config.REFRESH_TOKEN_LIFETIME});
        return {
            access_token,
            refresh_token
        };
    },

    verifyToken: async (token, tokenType) => {
        try {
            let secret = '';

            switch (tokenType) {
                case ACCESS:
                    secret = config.JWT_SECRET;
                    break;
                case REFRESH:
                    secret = config.JWT_REFRESH_SECRET;
                    break;
                case ACTION_TOKEN:
                    secret = config.JWT_ACTION_SECRET;
                    break;
                default:
                    throw new ErrorHandler(WRONG_TOKEN_TYPE, SERVER);
            }

            await jwt.verify(token, secret);
        } catch (e) {
            throw new ErrorHandler(INVALID_TOKEN, UNAUTHORIZED);
        }
    },

    generateActivateToken: (tokenType) => {
        let secret = '';

        switch (tokenType) {
            case ACTION_TOKEN:
                secret = config.JWT_ACTION_SECRET;
                break;
        }

        return jwt.sign({}, secret, {expiresIn: config.ACTION_TOKEN_LIFETIME});
    }
};
