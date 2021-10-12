const router = require('express').Router();

const {loginController} = require('../controllers');
const {userAuthMiddleware} = require('../middleware');

router.post(
    '/',
    userAuthMiddleware.isLoginValid,
    userAuthMiddleware.isUserPresent,
    userAuthMiddleware.isPasswordMatched,
    loginController.accountUser
);

module.exports = router;
