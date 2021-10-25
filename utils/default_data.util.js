const {User} = require('../db');
const {userRolesEnum, config} = require('../config');

module.exports = async () => {
    const user = await User.findOne({role: userRolesEnum.ADMIN});

    if (!user) {
        await User.createUserWithPassword({
            name: 'Admin',
            login: 'admin',
            email: config.ADMIN_EMAIL,
            password: config.ADMIN_PASSWORD,
            age: 18,
            role: userRolesEnum.ADMIN,
            is_active: true
        });
    }
};
