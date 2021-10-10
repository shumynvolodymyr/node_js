const router = require('express').Router();

const {loginController} = require('../controllers/login.controller');
const {isLoginDataValid} = require('../middleware/login.middleware');

router.post('/', isLoginDataValid, loginController);

module.exports = router;
