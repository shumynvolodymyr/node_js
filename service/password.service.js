const bcrypt = require('bcrypt');

const {ErrorHandler, messagesEnum} = require('../errors');
const {ResponseStatusCodesEnum} = require('../config');

const saltRounds = 10;

module.exports = {
    hash: (password) => bcrypt.hash(password, saltRounds),
    compare: async (password, hashPassword) => {
        const isMatch = await bcrypt.compare(password, hashPassword);

        if (!isMatch) {
            throw new ErrorHandler(messagesEnum.BAD_REQUEST_NOT_FOUND, ResponseStatusCodesEnum.BAD_REQUEST);
        }
    }
};
