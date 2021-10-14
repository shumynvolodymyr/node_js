const {passwordService} = require('../service');
const {User} = require('../db');
const {userNormalized: {userNormalizeHandler}} = require('../utils');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const user = await User.find();

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    getUserById: (req, res, next) => {
        try {
            const {user} = req;

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    createUsers: async (req, res, next) => {
        try {
            const {password} = req.body;
            const hashedPassword = await passwordService.hash(password);
            const user = await User.create({...req.body, password: hashedPassword});
            const userNormalized = userNormalizeHandler(user.toJSON());

            res.json(userNormalized);
        } catch (e) {
            next(e);
        }
    },

    deleteUsers: async (req, res, next) => {
        try {
            const {user_id} = req.params;

            await User.deleteOne({_id: user_id});

            res.json(`UserID: ${user_id} was deleted`);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const password = await passwordService.hash(req.body.password);

            await User.updateOne({_id: user_id}, {$set: {password}});

            res.json(`User ID: ${user_id} was updated`);
        } catch (e) {
            next(e);
        }
    }
};
