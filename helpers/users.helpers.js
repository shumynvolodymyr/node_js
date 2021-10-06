const fs = require('fs');
const util = require('util');

const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);

async function fileReader(path) {
    const data = await readFilePromise(path);

    return JSON.parse(data.toString());
}

async function fileWriter(path, file) {
    await writeFilePromise(path, JSON.stringify(file));
}

module.exports = {fileReader, fileWriter};
