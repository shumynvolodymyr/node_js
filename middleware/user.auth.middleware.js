const User = require('../db/User');
const passwordService = require('../service/password.service');
const {userAuthValidator} = require('../joi_validators/login.validator');

module.exports = {
    authenticationMiddleware: async (req, res, next) => {
        try {
            const {login, password} = req.body;
            const user = await User.findOne({login}).select('+password');

            if (!user) {
                throw new Error('Wrong login or password');
            }

            await passwordService.compare(password, user.password);

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    isLoginValid: (req, res, next) => {
        try {
            const {error} = userAuthValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
