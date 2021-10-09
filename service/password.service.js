const bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports = {
    hash: (password) => bcrypt.hash(password, saltRounds),
    compare: async (password, hashPassword) => {
        const isMatch = await bcrypt.compare(password, hashPassword);

        if (!isMatch) {
            throw new Error('Wrong login or password');
        }
    }
};
