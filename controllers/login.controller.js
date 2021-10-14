const User = require('../db/User');

module.exports = {
    loginUser: async (req, res, next) => {
        try {
            const {login} = req.body;

            await User.updateOne({login}, {$set: {status: true}});

            res.json(`WELCOME ${login}`);
        } catch (e) {
            next(e);
        }
    },

    logoutUser: async (req, res, next) => {
        try {
            const {login} = req.body;

            await User.updateOne({login}, {$set: {status: false}});

            res.json(`Goodbye ${login}`);
        } catch (e) {
            next(e);
        }
    }
};
