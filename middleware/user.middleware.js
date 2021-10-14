const User = require('../db/User');
const {userValidator: {createUserValidator, updateUserValidator}} = require('../joi_validators');
const {ErrorHandler} = require('../errors');
const {
    customError: {
        NOT_FOUND_BY_ID,
        NOT_VALID_FILE,
        FORBIDDEN_USER_NOT_CONFIRMED
    }
} = require('../errors');

module.exports = {
    searchIdMiddleware: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const user = await User.findById(user_id);

            if (!user) {
                return next(new ErrorHandler(NOT_FOUND_BY_ID.message, NOT_FOUND_BY_ID.code));
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserBodyValid: (req, res, next) => {
        try {
            const {error, value} = createUserValidator.validate(req.body);

            if (error) {
                return next(new ErrorHandler(error.details[0].message, NOT_VALID_FILE.code));
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    isUpdateBodyValid: (req, res, next) => {

        try {
            const {login, password, email} = req.body;

            if (email || login) {
                return next(new ErrorHandler(FORBIDDEN_USER_NOT_CONFIRMED.message, FORBIDDEN_USER_NOT_CONFIRMED.code));
            }

            const {error, value} = updateUserValidator.validate({password});

            if (error) {
                return next(new ErrorHandler(error.details[0].message, NOT_VALID_FILE.code));
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },
};
