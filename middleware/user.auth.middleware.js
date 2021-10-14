const {passwordService} = require('../service');
const {User} = require('../db');
const {ErrorHandler} = require('../errors');
const {loginValidator: {userAuthValidator}} = require('../joi_validators');
const {customError: {NOT_VALID_FILE, BAD_REQUEST_NOT_FOUND, BAD_REQUEST_USER_ACTIVATED}} = require('../errors');

module.exports = {
    isLoginValid: (req, res, next) => {
        try {
            const {error} = userAuthValidator.validate(req.body);

            if (error) {
                return next(new ErrorHandler(error.details[0].message, NOT_VALID_FILE.code));
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserPresent: async (req, res, next) => {
        try {
            const {login} = req.body;
            const user = await User.findOne({login}).select('+password');

            if (!user) {
                return next(new ErrorHandler(BAD_REQUEST_NOT_FOUND.message, BAD_REQUEST_NOT_FOUND.code));
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
            return next(new ErrorHandler(BAD_REQUEST_USER_ACTIVATED.message, BAD_REQUEST_USER_ACTIVATED.code));
        }

        next();
    }
};
