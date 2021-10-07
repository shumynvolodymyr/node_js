const User = require('../db/User');

module.exports = {
    authenticationMiddleware: async (req, res, next) => {
        try {
            const loginData = await User.findOne({login: req.body.login, email: req.body.email});

            if (!loginData) {
                return res.json('the account does not exist or the password is incorrect');
            }

            next();
        } catch (e) {
            res.json(e);
        }
    }
};
