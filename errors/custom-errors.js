module.exports = {
    BAD_REQUEST_USER_ACTIVATED: {
        message: 'User is already activated',
        code: 400
    },
    NOT_VALID_FILE: {
        message: 'Not valid file',
        code: 400
    },
    FORBIDDEN_USER_NOT_CONFIRMED: {
        message: 'You can change your email address or login only with administrator permission',
        code: 403
    },
    BAD_REQUEST_NOT_FOUND: {
        message: 'Wrong login or password',
        code: 404
    },
    NOT_FOUND_BY_ID: {
        message: 'Not found user with this ID',
        code: 404
    },
};
