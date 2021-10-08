const router = require('express').Router();

const {authenticationMiddleware} = require('../middleware/user.auth.middleware');
const {accountUser} = require('../controllers/login.controller');

router.post('/', authenticationMiddleware, accountUser);

module.exports = router;
