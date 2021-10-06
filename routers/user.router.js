const router = require('express').Router();

const {getUsers, createUsers, updateUsers, deleteUsers, getUserById} = require('../controllers/user.controller');

router.get('/', getUsers);
router.post('/', createUsers);
router.put('/', updateUsers);

router.get('/:user_id', getUserById);
router.delete('/:user_id', deleteUsers);

module.exports = router;
