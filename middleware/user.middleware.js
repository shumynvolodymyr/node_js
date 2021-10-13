const User = require('../db/User');
const {userValidator: {createUserValidator, updateUserValidator}} = require('../joi_validators');
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {
    searchIdMiddleware: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const user = await User.findById(user_id);

            if (!user) {
                throw new ErrorHandler('Not found user with this ID', 400);
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
                throw new ErrorHandler(error.details[0].message, 400);
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
            const {error, value} = updateUserValidator.validate({password});

            if (error) {
                throw new ErrorHandler(error.details[0].message, 400);
            }

            if (email || login) {
                throw new ErrorHandler('You can change your email address or login only with administrator permission', 403);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },
};
