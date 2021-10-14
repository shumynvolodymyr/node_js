const bcrypt = require('bcrypt');

const {ErrorHandler, customError: {BAD_REQUEST_NOT_FOUND}} = require('../errors');

const saltRounds = 10;

module.exports = {
    hash: (password) => bcrypt.hash(password, saltRounds),
    compare: async (password, hashPassword) => {
        const isMatch = await bcrypt.compare(password, hashPassword);

        if (!isMatch) {
            throw new ErrorHandler(BAD_REQUEST_NOT_FOUND.message, BAD_REQUEST_NOT_FOUND.code);
        }
    }
};
