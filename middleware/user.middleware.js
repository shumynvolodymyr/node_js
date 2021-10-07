const User = require('../db/User');

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
            res.json(e);
        }
    },

    searchIdMiddleware: async (res, req, next) => {
        try {
            const id = req.params;
            const userById = await User.findById(id);

            if (!userById) {
                throw new Error('Not found user with this ID');
            }

            next();
        } catch (e) {
            res.json(e);
        }
    }
};
