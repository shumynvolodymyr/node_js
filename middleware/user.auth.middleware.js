const {jwtService} = require('../service');
const {User, O_Auth, Action} = require('../db');
const {ErrorHandler, messagesEnum} = require('../errors');
const {ResponseStatusCodesEnum, constants: {AUTHORIZATION}} = require('../config');
const {loginValidator} = require('../joi_validators');

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

            const response = await O_Auth.findOne({[tokenType]: token});

            if (!response) {
                throw new ErrorHandler(messagesEnum.INVALID_TOKEN, ResponseStatusCodesEnum.UNAUTHORIZED);
            }

            req.user = response.user_id;
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

            const response = await Action.findOne({action_token: token});

            if (!response) {
                throw new ErrorHandler(messagesEnum.INVALID_TOKEN, ResponseStatusCodesEnum.UNAUTHORIZED);
            }

            await Action.deleteOne({_id: response._id});

            req.user = response.user_id;
            req.token = token;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkPasswordValid: (req, res, next) => {
        try {
            const {error, value} = loginValidator.passwordValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message, ResponseStatusCodesEnum.BAD_REQUEST);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    }
};
