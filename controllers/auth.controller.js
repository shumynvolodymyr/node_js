const {O_Auth} = require('../db');
const {jwtService} = require('../service');
const {tokenTypesEnum: {ACCESS, REFRESH}} = require('../config');

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
            const {login} = req.body;
            const token = req.token;

            await O_Auth.deleteOne({[ACCESS]: token});

            res.json(`Goodbye ${login}`);
        } catch (e) {
            next(e);
        }
    },

    refreshTokenController: async (req, res, next) => {
        try {
            const token = req.token;
            const tokenPair = jwtService.generateTokenPair();

            await O_Auth.updateOne({[REFRESH]: token}, {$set: {...tokenPair}});

            res.json(tokenPair);
        } catch (e) {
            next(e);
        }
    }
};
