const {
    emailActionEnum:
        {LOGIN, USER_DELETED, USER_CREATED, USER_UPDATED, FORGOT_PASSWORD, PASSWORD_CHANGED}
} = require('../config');

module.exports = {
    [LOGIN]: {
        templateName: 'login',
        subject: 'Welcome on board!'
    },
    [USER_DELETED]: {
        templateName: 'delete',
        subject: 'Your account has been deleted!'
    },
    [USER_CREATED]: {
        templateName: 'create',
        subject: 'Account created successfully!'
    },
    [USER_UPDATED]: {
        templateName: 'update',
        subject: 'Account updated!'
    },
    [FORGOT_PASSWORD]: {
        templateName: 'forgot',
        subject: 'Password recovery'
    },
    [PASSWORD_CHANGED]: {
        templateName: ' password-changed',
        subject: 'Password recovery'
    }
};
