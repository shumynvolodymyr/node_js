const {O_Auth, User, Action} = require('../db');
const {jwtService} = require('../service');
const {
    tokenTypesEnum: {ACCESS, REFRESH, FORGOT_PASSWORD},
    ResponseStatusCodesEnum,
    emailActionEnum,
    tokenTypesEnum,
    config
} = require('../config');
const {messagesEnum} = require('../errors');

module.exports = {
    loginUser: async (req, res, next) => {
        try {
            const {user} = req;
            const {password} = req.body;

            await user.comparePassword(password);

            const tokenPair = jwtService.generateTokenPair();

            await O_Auth.create({...tokenPair, user_id: user._id});
            await user.sendMail(emailActionEnum.LOGIN, {userName: user.login});

            res.json({...tokenPair, id: user._id});
        } catch (e) {
            next(e);
        }
    },

    logoutUser: async (req, res, next) => {
        try {
            const token = req.token;

            await O_Auth.deleteOne({[ACCESS]: token});

            res.sendStatus(ResponseStatusCodesEnum.NO_CONTENT);
        } catch (e) {
            next(e);
        }
    },

    refreshTokenController: async (req, res, next) => {
        try {
            const token = req.token;
            const tokenPair = jwtService.generateTokenPair();

            await O_Auth.updateOne({[REFRESH]: token}, {$set: {...tokenPair}});

            res.status(ResponseStatusCodesEnum.CREATED).json(messagesEnum.UPDATE_USER);
        } catch (e) {
            next(e);
        }
    },

    activateController: async (req, res, next) => {
        try {
            const {_id} = req.user;

            await User.updateOne({_id}, {$set: {is_active: true}});

            res.status(ResponseStatusCodesEnum.OK).json(messagesEnum.SUCCESSFULLY_ACTIVATED);
        } catch (e) {
            next(e);
        }
    },

    sendEmailForgotPassword: async (req, res, next) => {
        try {
            const {user} = req;
            const action_token = jwtService.generateActivateToken(tokenTypesEnum.FORGOT_PASSWORD);
            const forgotPasswordUrl = config.FORGOT_PASSWORD_URL + action_token;

            await Action.create({action_token, type: FORGOT_PASSWORD, user_id: user._id});
            await user.sendMail(emailActionEnum.FORGOT_PASSWORD, {login: user.login, forgotPasswordUrl});

            res
                .status(ResponseStatusCodesEnum.CREATED)
                .json(`${forgotPasswordUrl}, ${messagesEnum.FORGOT_PASSWORD_EMAIL}`);
        } catch (e) {
            next(e);
        }
    },

    setNewPassword: async (req, res, next) => {
        try {
            const {user} = req;
            const {password} = req.body;

            await User.updateUserWithNewPassword(user._id, password);
            await O_Auth.deleteMany({user_id: user._id});
            await user.sendMail(emailActionEnum.PASSWORD_CHANGED, {login: user.login, password});

            res
                .status(ResponseStatusCodesEnum.OK)
                .json(messagesEnum.UPDATE_USER);
        } catch (e) {
            next(e);
        }
    },
};
