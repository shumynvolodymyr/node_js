const {loginValidator: {userAuthValidator}} = require('../joi_validators');
const passwordService = require('../service/password.service');
const User = require('../db/User');
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {
    isLoginValid: (req, res, next) => {
        try {
            const {error} = userAuthValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, 400);
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
                throw new ErrorHandler('Wrong login or password', 404);
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
    }
};
