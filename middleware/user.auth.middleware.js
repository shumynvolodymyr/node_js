const {passwordService, jwtService} = require('../service');
const {User, O_Auth} = require('../db');
const {ErrorHandler, messagesEnum} = require('../errors');
const {ResponseStatusCodesEnum, constants: {AUTHORIZATION}} = require('../config');

module.exports = {

    isUserPresent: async (req, res, next) => {
        try {
            const {login} = req.body;
            const user = await User.findOne({login}).select('+password');

            if (!user) {
                throw new ErrorHandler(messagesEnum.BAD_REQUEST_NOT_FOUND, ResponseStatusCodesEnum.BAD_REQUEST);
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    isPasswordMatched: async (req, res, next) => {
        try {
            const {password} = req.body;
            const hashPassword = req.user.password;

            await passwordService.compare(password, hashPassword);

            next();
        } catch (e) {
            next(e);
        }
    },

    checkToken: (tokenType) => async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(messagesEnum.INVALID_TOKEN, ResponseStatusCodesEnum.UNAUTHORIZED);
            }

            await jwtService.verifyToken(token, tokenType);

            const tokenResponse = await O_Auth.findOne({[tokenType]: token}).populate('user_id');

            if (!tokenResponse) {
                throw new ErrorHandler(messagesEnum.INVALID_TOKEN, ResponseStatusCodesEnum.UNAUTHORIZED);
            }

            res.user = tokenResponse.user_id;
            req.token = token;

            next();
        } catch (e) {
            next(e);
        }
    }
};
