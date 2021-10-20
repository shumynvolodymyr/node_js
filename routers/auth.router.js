const router = require('express').Router();

const {authController} = require('../controllers');
const {userAuthMiddleware, userMiddleware} = require('../middleware');
const {loginValidator: {userAuthValidator}} = require('../joi_validators');
const {tokenTypesEnum: {REFRESH, ACCESS, ACTION_TOKEN}} = require('../config');

router.get(
    '/activate/:token',
    userAuthMiddleware.checkActivateToken(ACTION_TOKEN),
    authController.activateController
);

router.post(
    '/',
    userMiddleware.isUserBodyValid(userAuthValidator),
    userAuthMiddleware.isUserPresent,
    userAuthMiddleware.isPasswordMatched,
    authController.loginUser
);

router.post(
    '/logout',
    userAuthMiddleware.checkToken(ACCESS),
    authController.logoutUser
);
router.post(
    '/refresh',
    userAuthMiddleware.checkToken(REFRESH),
    authController.refreshTokenController
);

module.exports = router;
