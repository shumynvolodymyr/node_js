const router = require('express').Router();

const {userController} = require('../controllers');
const {fileMiddleware, userMiddleware, userAuthMiddleware} = require('../middleware');
const {userValidator: {createUserValidator, updateUserValidator}} = require('../joi_validators');
const {tokenTypesEnum: {ACCESS}} = require('../config');

router.post(
    '/',
    userMiddleware.isUserBodyValid(createUserValidator),
    fileMiddleware.checkUserImage,
    userMiddleware.checkUniqueData,
    userController.createUsers
);

router.use(userAuthMiddleware.checkToken(ACCESS), userMiddleware.isUserActive);

router.get('/', userController.getUsers);

router.put(
    '/:user_id',
    userMiddleware.isUserBodyValid(updateUserValidator),
    userMiddleware.searchIdMiddleware,
    userController.updateUser
);
router.get(
    '/:user_id',
    userMiddleware.searchIdMiddleware,
    userController.getUserById
);
router.delete(
    '/:user_id',
    userMiddleware.searchIdMiddleware,
    userController.deleteUsers
);

module.exports = router;
