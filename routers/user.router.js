const router = require('express').Router();

const {getUsers, createUsers, deleteUsers, getUserById, updateUser} = require('../controllers/user.controller');
const {
    createUserMiddleware,
    searchIdMiddleware,
    isUserBodyValid,
    isUpdateBodyValid
} = require('../middleware/user.middleware');

router.get('/', getUsers);
router.post('/', isUserBodyValid, createUserMiddleware, createUsers);

router.put('/:user_id', searchIdMiddleware,isUpdateBodyValid, updateUser);
router.get('/:user_id', searchIdMiddleware, getUserById);
router.delete('/:user_id', searchIdMiddleware, deleteUsers);

module.exports = router;
