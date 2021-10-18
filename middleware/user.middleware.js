const User = require('../db/User');
const {ErrorHandler, messagesEnum} = require('../errors');
const {ResponseStatusCodesEnum} = require('../config');

module.exports = {
    searchIdMiddleware: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const user = await User.findById(user_id);

            if (!user) {
                throw new ErrorHandler(messagesEnum.NOT_FOUND_BY_ID, ResponseStatusCodesEnum.NOT_FOUND);
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserBodyValid: (validator) => (req, res, next) => {
        try {
            const {error, value} = validator.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, ResponseStatusCodesEnum.BAD_REQUEST);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUniqueData: async (req, res, next) => {
        try {
            const {login, email} = req.body;
            const loginData = await User.findOne({login});

            if (loginData) {
                throw new ErrorHandler(messagesEnum.EXIST_LOGIN, ResponseStatusCodesEnum.CONFLICT);
            }

            const emailData = await User.findOne({email});

            if (emailData) {
                throw new ErrorHandler(messagesEnum.EXIST_EMAIL, ResponseStatusCodesEnum.CONFLICT);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};
