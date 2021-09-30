const fs = require('fs');
const path = require('path');

const pathGirlsFile = path.join(__dirname, 'girls');
const pathBoysFile = path.join(__dirname, 'boys');

const sorter = (directory, gender, pathGender) => {
    const pathName = path.join(__dirname, directory);

    fs.readdir(pathName, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        
        data.forEach(file => {
            const pathFile = path.join(pathName, file);

            fs.readFile(pathFile, (err, data) => {
                if (err) {
                    console.log(err);
                    return;
                }

                const value = JSON.parse(data);

                if (value.gender === gender) {
                    fs.rename(pathFile, path.join(pathGender, file), err => {
                        console.log(err);
                    });
                }
            });
        });
    });
}

sorter('boys', 'female', pathGirlsFile);
sorter('girls', 'male', pathBoysFile);
