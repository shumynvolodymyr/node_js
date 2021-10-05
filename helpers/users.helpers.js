const fs = require('fs');
const util = require('util');

const readFilePromise = util.promisify(fs.readFile);

async function fileReader(path) {
    let data = await readFilePromise(path);

    return JSON.parse(data.toString());
}

module.exports = {fileReader};
