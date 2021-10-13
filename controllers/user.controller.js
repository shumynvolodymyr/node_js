const {passwordService, fileService} = require('../service');
const User = require('../db/User');
const {userNormalizeHandler} = require('../utils/userNormalizeHandler');

module.exports = {
    getUsers: async (req, res) => {
        try {
            const user = await User.find();

            res.json(user);
        } catch (e) {
            res.json(e.message);
        }
    },

    getUserById: (req, res) => {
        try {
            const {user} = req;

            res.json(user);
        } catch (e) {
            res.json(e.message);
        }
    },

    createUsers: async (req, res) => {
        try {
            const {password} = req.body;
            const picture = req.files.picture;
            const hashedPassword = await passwordService.hash(password);
            const fileName = fileService.saveFile(picture);
            const user = await User.create({...req.body, password: hashedPassword, picture: fileName});
            const userNormalized = userNormalizeHandler(user.toJSON());

            res.json(userNormalized);
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

    updateUser: async (req, res) => {
        try {
            const {user_id} = req.params;
            const password = await passwordService.hash(req.body.password);

            const nn = await User.updateOne({_id: user_id}, {$set: {...req.body, password}}, {new: true});
            console.log(nn);
            res.json(`User ID: ${user_id} was updated`);
        } catch (e) {
            res.json(e.message);
        }
    }
};
