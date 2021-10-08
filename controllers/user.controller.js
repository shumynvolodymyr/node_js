const User = require('../db/User');

module.exports = {
    getUsers: async (req, res) => {
        try {
            res.json(await User.find());
        } catch (e) {
            res.json(e.message);
        }
    },

    getUserById: (req, res) => {
        try {
            const user = req.user;

            res.json(user);
        } catch (e) {
            res.json(e.message);
        }
    },

    createUsers: async (req, res) => {
        try {
            const newUser = await User.create(req.body);

            res.json(newUser);
        } catch (e) {
            res.json(e.message);
        }
    },

    deleteUsers: async (req, res) => {
        try {
            const {user_id} = req.params;
            await User.deleteOne({_id: user_id});

            res.json(`UserID: ${user_id} was deleted`);
        } catch (e) {
            res.json(e.message);
        }
    },
};
