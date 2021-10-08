const router = require('express').Router();

const {getUsers, createUsers, deleteUsers, getUserById} = require('../controllers/user.controller');
const {createUserMiddleware, searchIdMiddleware} = require('../middleware/user.middleware');

router.get('/', getUsers);
router.post('/', createUserMiddleware, createUsers);

router.get('/:user_id', searchIdMiddleware, getUserById);
router.delete('/:user_id', searchIdMiddleware, deleteUsers);

module.exports = router;
