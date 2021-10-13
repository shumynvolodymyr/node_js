const uuid = require('uuid');
const path = require('path');

module.exports = {
    saveFile: (file) => {
        const fileName = uuid.v4() + '.jpg';
        const filePath = path.resolve('images', fileName);

        file.mv(filePath);

        return fileName;
    }
};
