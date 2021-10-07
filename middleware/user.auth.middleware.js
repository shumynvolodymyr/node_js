const User = require('../db/User');

module.exports = {
    authenticationMiddleware: async (req, res, next) => {
        try {
            const {login, email} = req.body;
            const loginData = await User.findOne({login, email});

            if (!loginData) {
                throw new Error('Incorrect login or password');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
