const {passwordService, jwtService} = require('../service');
const {User, O_Auth, Action} = require('../db');
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

            const {user_id: user} = await O_Auth.findOne({[tokenType]: token}).populate('user_id');

            if (!user) {
                throw new ErrorHandler(messagesEnum.INVALID_TOKEN, ResponseStatusCodesEnum.UNAUTHORIZED);
            }

            req.user = user;
            req.token = token;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkActivateToken: (tokenType) => async (req, res, next) => {
        try {
            const {token} = req.params;

            if (!token) {
                throw new ErrorHandler(messagesEnum.INVALID_TOKEN, ResponseStatusCodesEnum.UNAUTHORIZED);
            }
            await jwtService.verifyToken(token, tokenType);

            const {_id, user_id: user} = await Action.findOne({[tokenType]: token}).populate('user_id');

            if (!user) {
                throw new ErrorHandler(messagesEnum.INVALID_TOKEN, ResponseStatusCodesEnum.UNAUTHORIZED);
            }

            await Action.deleteOne({_id});

            req.user = user;
            req.token = token;

            next();
        } catch (e) {
            next(e);
        }
    }
};
