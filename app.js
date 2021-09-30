    const fs = require('fs');
    const path = require('path');

const sorter = (directory) => {

    const pathName = path.join(__dirname, directory);

    fs.readdir(pathName, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        data.forEach(file => {

            const pathFile = path.join(pathName, file);
            const pathBoysFile = path.join(__dirname, 'boys', file);
            const pathGirlsFile = path.join(__dirname, 'girls', file);

            fs.readFile(pathFile, (err, data) => {
                if (err) {
                    console.log(err);
                    return;
                }

                const value = JSON.parse(data);

                if (value.gender === "female") {
                    fs.rename(pathFile, pathGirlsFile, err => {
                        console.log(err);
                    });
                }
                if (value.gender === "male") {
                    fs.rename(pathFile, pathBoysFile, err => {
                        console.log(err);
                    });
                }
            });
        });
    });
}

sorter('boys');
sorter('girls');
