const db = require('../db/users_db.json');
const fs = require('fs');
const path = require("path");

const pathDB = path.join(__dirname, '../', 'db', 'users_db.json');

module.exports = {
    getUsers: (req, res) => {
        fs.readFile(pathDB, (err, data) => {
            if (err) {
                console.log(err);
            }

            res.json(JSON.parse(data.toString()));
        });
    },

    getUserById: (req, res) => {
        const {user_id} = req.params;

        fs.readFile(pathDB, (err, data) => {
            if (err) {
                console.log(err);
            }

            const users = JSON.parse(data.toString());
            const user = users.filter(user => {
                return user_id === user.id
            });
            res.json(user);
        });
    },

    createUsers: (req, res) => {
        fs.readFile(pathDB, (err, data) => {
            if (err) {
                console.log(err);
            }
            const users = JSON.parse(data.toString());
            users.push({...req.body, id: users.length + 1});

            fs.writeFile(pathDB, JSON.stringify(users), (err) => {
                if (err) {
                    console.log(err);
                }
            })
        });
        res.json(db);
    },

    updateUsers: (req, res) => {
        res.json('update user');
    },

    deleteUsers: (req, res) => {
        res.json('delete user');
    }
}
