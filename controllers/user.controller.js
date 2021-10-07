const User = require('../db/User');

module.exports = {
    getUsers: async (req, res) => {
        try {
            res.json(await User.find());
        } catch (e) {
            res.json(e);
        }
    },

    getUserById: async (req, res) => {
        try {
            const {user_id} = req.params;
            const user = await User.findById(user_id);

            res.json(user);
        } catch (e) {
            res.json(e);
        }
    },

    createUsers: async (req, res) => {
        try {
            const newUser = await User.create(req.body);

            res.json(newUser);
        } catch (e) {
            res.json(e);
        }
    },

    deleteUsers: async (req, res) => {
        try {
            const {user_id} = req.params;
            await User.deleteOne({_id: user_id});

            res.json(`UserID: ${user_id} was deleted`);
        } catch (e) {
            res.json(e);
        }
    },

    accountUser: (req, res) => {
        try {
            const {login} = req.body;

            res.json(`WELCOME ${login}`);
        } catch (e) {
            res.json(e);
        }
    }
};
