const router = require('express').Router();

const {getUsers, createUsers, deleteUsers, getUserById, accountUser} = require('../controllers/user.controller');
const {authenticationMiddleware} = require('../middleware/user.auth.middleware');
const {createUserMiddleware} = require('../middleware/user.middleware');

router.get('/', getUsers);
router.post('/', createUserMiddleware, createUsers);

router.get('/:user_id', getUserById);
router.delete('/:user_id', deleteUsers);
router.post('/login', authenticationMiddleware, accountUser);

module.exports = router;
