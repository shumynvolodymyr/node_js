const {jwtService} = require('../service');
const {User, O_Auth, Action} = require('../db');
const {ErrorHandler, messagesEnum} = require('../errors');
const {ResponseStatusCodesEnum, constants: {AUTHORIZATION}} = require('../config');

module.exports = {

    isUserPresent: (fieldForChecks) => async (req, res, next) => {
        try {
            const user = await User.findOne({[fieldForChecks]: req.body[fieldForChecks]}).select('+password');

            if (!user) {
                throw new ErrorHandler(messagesEnum.BAD_REQUEST_NOT_FOUND, ResponseStatusCodesEnum.NOT_FOUND);
            }

            req.user = user;

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
