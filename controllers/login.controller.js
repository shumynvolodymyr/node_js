const User = require('../db/User');

module.exports = {
    loginUser: async (req, res) => {
        try {
            const {login} = req.body;
            await User.updateOne({login}, {$set: {status: true}});

            res.json(`WELCOME ${login}`);
        } catch (e) {
            res.json(e.message);
        }
    },

    logoutUser: async (req, res) => {
        try {
            const {login} = req.body;
            await User.updateOne({login}, {$set: {status: false}});

            res.json(`Goodbye ${login}`);
        } catch (e) {
            res.json(e.message);
        }
    }
};
