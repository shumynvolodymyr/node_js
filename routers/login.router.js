const router = require('express').Router();

const {loginController} = require('../controllers');
const {userAuthMiddleware} = require('../middleware');

router.post(
    '/',
    userAuthMiddleware.isLoginValid,
    userAuthMiddleware.isUserPresent,
    userAuthMiddleware.isPasswordMatched,
    userAuthMiddleware.isUserLoggedIn,
    loginController.loginUser
);

router.post(
    '/logout',
    userAuthMiddleware.isLoginValid,
    userAuthMiddleware.isUserPresent,
    userAuthMiddleware.isPasswordMatched,
    loginController.logoutUser
);

module.exports = router;
