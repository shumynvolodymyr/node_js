const User = require("../db/User");

module.exports = {
    searchIdMiddleware: async (res, req, next) => {
        try {
            const {user_id} = req.params;
            const userById = await User.findById(user_id);

            if (!userById) {
                throw new Error('Not found user with this ID');
            }

            next();
        } catch (e) {
            res.json(e);
        }
    }
};
