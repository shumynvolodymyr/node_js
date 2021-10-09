const User = require('../db/User');
const {createUserValidator, updateUserValidator} = require('../joi_validators/user.validator');

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const {email} = req.body;
            const userByEmail = await User.findOne({email});

            if (userByEmail) {
                throw new Error('Email already exist');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    searchIdMiddleware: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const user = await User.findById(user_id);

            if (!user) {
                throw new Error('Not found user with this ID');
            }

            req.user = user;
            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    isUserBodyValid: (req, res, next) => {
        try {
            const {error, value} = createUserValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            req.body = value;

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    isUpdateBodyValid: (req, res, next) => {

        try {
            const {login, password, email} = req.body;
            const {error, value} = updateUserValidator.validate({password});

            if (error) {
                throw new Error(error.details[0].message);
            }

            if (email || login) {
                throw new Error('You can change your email address or login only with administrator permission');
            }

            req.body = value;

            next();
        } catch (e) {
            res.json(e.message);
        }
    },
};
