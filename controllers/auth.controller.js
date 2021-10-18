const {O_Auth} = require('../db');
const {jwtService} = require('../service');
const {tokenTypesEnum: {ACCESS, REFRESH}, ResponseStatusCodesEnum} = require('../config');
const {messagesEnum} = require('../errors');

module.exports = {
    loginUser: async (req, res, next) => {
        try {
            const user = req.user;
            const tokenPair = jwtService.generateTokenPair();

            await O_Auth.create({...tokenPair, user_id: user._id});

            res.json({...tokenPair, id: user._id});
        } catch (e) {
            next(e);
        }
    },

    logoutUser: async (req, res, next) => {
        try {
            const token = req.token;

            await O_Auth.deleteOne({[ACCESS]: token});

            res
                .sendStatus(ResponseStatusCodesEnum.NO_CONTENT);
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
    }
};
