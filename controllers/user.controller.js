const {passwordService, mailService: {sendMail}, jwtService} = require('../service');
const {User, Action} = require('../db');
const {userNormalized: {userNormalizeHandler}} = require('../utils');
const {ResponseStatusCodesEnum, emailActionEnum, tokenTypesEnum, config} = require('../config/');
const {messagesEnum} = require('../errors');

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
            const {password, email, login} = req.body;
            const hashedPassword = await passwordService.hash(password);
            const user = await User.create({...req.body, password: hashedPassword});
            const userNormalized = userNormalizeHandler(user.toJSON());
            const action_token = jwtService.generateActivateToken(tokenTypesEnum.ACTION_TOKEN);
            const activatePasswordUrl = config.BASE_URL + config.ACTIVATE_URL + '/' + action_token;

            await Action.create({action_token, type: tokenTypesEnum.ACTION_TOKEN, user_id: userNormalized._id});
            await sendMail(email, emailActionEnum.USER_CREATED, {login, password, activatePasswordUrl});

            res.json(userNormalized);
        } catch (e) {
            next(e);
        }
    },

    deleteUsers: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const {user} = req;

            await User.deleteOne({_id: user_id});
            await sendMail(user.email, emailActionEnum.USER_DELETED, {userName: user.login});

            res.sendStatus(ResponseStatusCodesEnum.NO_CONTENT);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const {email, login} = req.user;
            const password = await passwordService.hash(req.body.password);

            await User.updateOne({_id: user_id}, {$set: {password}});
            await sendMail(email, emailActionEnum.USER_UPDATED, {login});

            res.status(ResponseStatusCodesEnum.CREATED).json(messagesEnum.UPDATE_USER);
        } catch (e) {
            next(e);
        }
    },
};
