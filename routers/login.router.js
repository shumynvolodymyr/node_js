const router = require('express').Router();

const {authenticationMiddleware, isLoginValid} = require('../middleware/user.auth.middleware');
const {accountUser} = require('../controllers/login.controller');

router.post('/', isLoginValid, authenticationMiddleware, accountUser);

module.exports = router;
