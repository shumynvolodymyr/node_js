const {jwtService, s3Service} = require('../service');
const {ResponseStatusCodesEnum, emailActionEnum, tokenTypesEnum, config} = require('../config/');
const {messagesEnum} = require('../errors');
const {User, Action, O_Auth} = require('../db');
const userService = require('../service/user.service');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const user = await userService.getAllUsers(req.query);

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
            const {password, login} = req.body;

            let user = await User.createUserWithPassword(req.body);
            const action_token = jwtService.generateActivateToken(tokenTypesEnum.ACTION_TOKEN);
            const activatePasswordUrl = config.ACTIVATE_URL + action_token;

            await Action.create({action_token, type: tokenTypesEnum.ACTION_TOKEN, user_id: user._id});
            await user.sendMail(emailActionEnum.USER_CREATED, {login, password, activatePasswordUrl});

            if (req.files?.image) {
                const info = await s3Service.uploadImage(req.files.image, 'users', user._id.toString());

                user = await User.findByIdAndUpdate({_id: user._id}, {image: info.Location}, {new: true});
            }

            res.json({user, action_token});
        } catch (e) {
            next(e);
        }
    },

    deleteUsers: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const {user} = req;

            await User.deleteOne({_id: user_id});
            await O_Auth.deleteMany({user_id});
            await user.sendMail(emailActionEnum.USER_DELETED, {userName: user.login});

            res.sendStatus(ResponseStatusCodesEnum.NO_CONTENT);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const {user} = req;

            await User.updateOne({_id: user_id}, {$set: {...req.body}});
            await user.sendMail(emailActionEnum.USER_UPDATED, user.login);

            res.status(ResponseStatusCodesEnum.CREATED).json(messagesEnum.UPDATE_USER);
        } catch (e) {
            next(e);
        }
    },
};
