const path = require("path");
const {fileReader, fileWriter} = require("../helpers/users.helpers");

const pathDB = path.join(__dirname, '../', 'db', 'users_db.json');

module.exports = {
    getUsers: async (req, res) => {
        res.json(await fileReader(pathDB));
    },

    getUserById: async (req, res) => {
        const {user_id} = req.params;
        const users = await fileReader(pathDB);
        const user = users.filter(user => user.id === +user_id);

        res.json(user);
    },

    createUsers: async (req, res) => {
        const users = await fileReader(pathDB);
        users.push({...req.body, id: Math.floor(Math.random() * 1000)});

        await fileWriter(pathDB, users);

        res.json(users);
    },

    updateUsers: (req, res) => {
        res.json('update user');
    },

    deleteUsers: async (req, res) => {
        const {user_id} = req.params;
        const users = await fileReader(pathDB);
        const user = users.filter(user => user.id !== +user_id)

        await fileWriter(pathDB, user);

        res.json(user);
    }
};
