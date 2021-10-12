const bcrypt = require('bcrypt');

const ErrorHandler = require('../errors/ErrorHandler');

const saltRounds = 10;

module.exports = {
    hash: (password) => bcrypt.hash(password, saltRounds),
    compare: async (password, hashPassword) => {
        const isMatch = await bcrypt.compare(password, hashPassword);

        if (!isMatch) {
            throw new ErrorHandler('Wrong login or password', 404);
        }
    }
};
