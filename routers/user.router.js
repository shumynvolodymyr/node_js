const router = require('express').Router();

const {userController} = require('../controllers');
const {userMiddleware} = require('../middleware');
const {userValidator: {createUserValidator, updateUserValidator}} = require('../joi_validators');

router.get(
    '/',
    userController.getUsers
);
router.post(
    '/',
    userMiddleware.isUserBodyValid(createUserValidator),
    userController.createUsers
);

router.put(
    '/:user_id',
    userMiddleware.fieldValidation,
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
