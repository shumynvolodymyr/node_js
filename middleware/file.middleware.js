const {
    constants: {PHOTOS_MIMETYPES},
    ResponseStatusCodesEnum: {BAD_REQUEST},
    config: {PHOTO_MAX_SIZE}
} = require('../config');

const {
    ErrorHandler,
    messagesEnum: {FORMAT_NOT_SUPPORTED, MAX_ALLOWED_SIZE}
} = require('../errors');

module.exports = {
    checkUserImage: (req, res, next) => {
        try {
            const {image} = req.files || {};

            if (!image) {
                next();
                return;
            }

            const {size, mimetype} = image;

            if (!PHOTOS_MIMETYPES.includes(mimetype)) {
                throw new ErrorHandler(FORMAT_NOT_SUPPORTED, BAD_REQUEST);
            }

            if (size > PHOTO_MAX_SIZE) {
                throw new ErrorHandler(`${MAX_ALLOWED_SIZE} ${PHOTO_MAX_SIZE}`, BAD_REQUEST);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
