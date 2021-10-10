const bcrypt = require('bcrypt');
const Boom = require('@hapi/boom');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),
    compare: async (password, hasPassword) => {
        const isPasswordMatch = await bcrypt.compare(password, hasPassword);

        if (!isPasswordMatch) {
            throw Boom.notFound('Wrong brand or password');
        }
    }
};
