const {getUsers, createUsers, updateUsers, deleteUsers, getUserById} = require("../controllers/user.controller");
const router = require('express').Router();

router.get('/', getUsers);

router.get('/:user_id', getUserById);

router.post('/', createUsers);

router.put('/', updateUsers);

router.delete('/', deleteUsers);

module.exports = router;
