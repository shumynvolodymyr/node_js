const router = require('express').Router();

const {loginController} = require('../controllers');
const {userAuthMiddleware, userMiddleware} = require('../middleware');
const {loginValidator: {userAuthValidator}} = require('../joi_validators');

router.post(
    '/',
    userMiddleware.isUserBodyValid(userAuthValidator),
    userAuthMiddleware.isUserPresent,
    userAuthMiddleware.isPasswordMatched,
    userAuthMiddleware.isUserLoggedIn,
    loginController.loginUser
);

router.post(
    '/logout',
    userMiddleware.isUserBodyValid(userAuthValidator),
    userAuthMiddleware.isUserPresent,
    userAuthMiddleware.isPasswordMatched,
    loginController.logoutUser
);

module.exports = router;
