const router = require('express').Router();

const {authController} = require('../controllers');
const {userAuthMiddleware, userMiddleware} = require('../middleware');
const {loginValidator: {userAuthValidator}} = require('../joi_validators');
const {tokenTypesEnum: {REFRESH, ACCESS}} = require('../config');

router.post(
    '/',
    userMiddleware.isUserBodyValid(userAuthValidator),
    userAuthMiddleware.isUserPresent,
    userAuthMiddleware.isPasswordMatched,
    authController.loginUser
);

router.post(
    '/logout',
    userMiddleware.isUserBodyValid(userAuthValidator),
    userAuthMiddleware.checkToken(ACCESS),
    userAuthMiddleware.isUserPresent,
    userAuthMiddleware.isPasswordMatched,
    authController.logoutUser
);
router.post(
    '/refresh',
    userAuthMiddleware.checkToken(REFRESH),
    authController.refreshTokenController
);

module.exports = router;
