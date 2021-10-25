const router = require('express').Router();

const {authController} = require('../controllers');
const {userAuthMiddleware, userMiddleware} = require('../middleware');
const {loginValidator: {userAuthValidator, passwordValidator}} = require('../joi_validators');
const {tokenTypesEnum: {REFRESH, ACCESS, ACTION_TOKEN, FORGOT_PASSWORD}, constants} = require('../config');

router.post(
    '/',
    userMiddleware.isUserBodyValid(userAuthValidator),
    userAuthMiddleware.isUserPresent(constants.LOGIN),
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

router.get(
    '/activate/:token',
    userAuthMiddleware.checkActivateToken(ACTION_TOKEN),
    authController.activateController
);

router.post(
    '/password/forgot',
    userAuthMiddleware.isUserPresent(constants.EMAIL),
    authController.sendEmailForgotPassword
);

router.put(
    '/password/forgot/:token',
    userMiddleware.isUserBodyValid(passwordValidator),
    userAuthMiddleware.checkActivateToken(FORGOT_PASSWORD),
    authController.setNewPassword,
);

module.exports = router;
