const Boom = require("@hapi/boom");

const {authDataValidator} = require('../joi_validator/login.validator');

module.exports = {
    isLoginDataValid: (req, res, next) => {
        try {
            const {error, value} = authDataValidator.validate(req.body);

            if (error) {
                throw Boom.badData(error.details[0].message);
            }

            req.body = value;

            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
