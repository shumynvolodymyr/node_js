const {passwordService} = require('../service');
const {User} = require('../db');
const {ErrorHandler, messagesEnum} = require('../errors');
const {ResponseStatusCodesEnum} = require('../config');

module.exports = {

    isUserPresent: async (req, res, next) => {
        try {
            const {login} = req.body;
            const user = await User.findOne({login}).select('+password');

            if (!user) {
                throw new ErrorHandler(messagesEnum.BAD_REQUEST_NOT_FOUND, ResponseStatusCodesEnum.NOT_FOUND);
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

    isUserLoggedIn: (req, res, next) => {
        const user = req.user;

        if (user.status) {
            throw new ErrorHandler(messagesEnum.USER_ACTIVATED, ResponseStatusCodesEnum.CONFLICT);
        }

        next();
    }
};
