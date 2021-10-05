const {getUsers, createUsers, updateUsers, deleteUsers, getUserById} = require("../controllers/user.controller");
const router = require('express').Router();

router.get('/', getUsers);
router.post('/', createUsers);
router.put('/', updateUsers);

router.get('/:user_id', getUserById);
router.delete('/:user_id', deleteUsers);

module.exports = router;
