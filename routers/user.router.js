const router = require('express').Router();

const {userController} = require('../controllers');
const {userMiddleware} = require('../middleware');

router.get(
    '/',
    userController.getUsers
);
router.post(
    '/',
    userMiddleware.isUserBodyValid,
    userController.createUsers
);

router.put(
    '/:user_id',
    userMiddleware.isUpdateBodyValid,
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
