const {O_Auth} = require('../db');
const {jwtService} = require('../service');

module.exports = {
    loginUser: async (req, res, next) => {
        try {
            const user = req.user;

            const tokenPair = jwtService.generateTokenPair();

            await O_Auth.create({...tokenPair, user_id: user._id});

            res.json(`WELCOME ${user.login}`);
        } catch (e) {
            next(e);
        }
    },

    logoutUser: (req, res, next) => {
        try {
            const {login} = req.body;

            res.json(`Goodbye ${login}`);
        } catch (e) {
            next(e);
        }
    }
};
