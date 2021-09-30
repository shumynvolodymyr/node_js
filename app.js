// - у вас є масив юзрів (до 10), з такими полями наприклад - const users = [
//     { name: 'olya', gender: 'female', age: 20 }
//         ...
// ], вам потрібно написати метод який створює файлики - де назва файлику - це імя вашого юзера (наприклад - Olya.txt),
// вміст це сам ваш юзер - { name: 'olya', gender: 'female', age: 20 }
// перед тим створити 4 папки (програмно) - наприклад - manOlder20, manYounger20, womanOlder20, womanYounger20
// і розподілити ваших юзерів саме по відповідних папках

const fs = require('fs');
const path = require('path');
const mkdirPath = path.join(__dirname, 'users');
const nameFolders = ['manOlder20', 'manYounger20', 'womanOlder20', 'womanYounger20'];
const users = [
    {name: 'olya', gender: 'female', age: 20},
    {name: 'vasya', gender: 'male', age: 21},
    {name: 'karina', gender: 'female', age: 22},
    {name: 'liza', gender: 'female', age: 19},
    {name: 'alex', gender: 'male', age: 18},
    {name: 'ruslan', gender: 'male', age: 25},
    {name: 'nina', gender: 'female', age: 24},
    {name: 'vera', gender: 'female', age: 27},
    {name: 'lyuba', gender: 'female', age: 17},
    {name: 'roman', gender: 'male', age: 15}
];

const folderCreator = (folders) => {
    folders.forEach(folder => {
        fs.mkdirSync(path.join(mkdirPath, folder), {recursive: true}, err => {
            console.log(err);
        });
    });
};

const userCreator = (users) => {
    users.forEach(user => {
        const pathWomanYounger20 = path.join(__dirname, 'users', 'womanYounger20', `${user.name}.json`);
        const pathWomanOlder20 = path.join(__dirname, 'users', 'womanOlder20', `${user.name}.json`);
        const pathManYounger20 = path.join(__dirname, 'users', 'manYounger20', `${user.name}.json`);
        const pathManOlder20 = path.join(__dirname, 'users', 'manOlder20', `${user.name}.json`);

        if (user.gender === 'female') {
            if (user.age <= 20) {
                fs.writeFile(pathWomanYounger20, `${JSON.stringify(user)}`, err => {
                    console.log(err);
                });
            }
            if (user.age > 20) {
                fs.writeFile(pathWomanOlder20, `${JSON.stringify(user)}`, err => {
                    console.log(err);
                });
            }
        }
        if (user.gender === 'male') {
            if (user.age <= 20) {
                fs.writeFile(pathManYounger20, `${JSON.stringify(user)}`, err => {
                    console.log(err);
                });
            }
            if (user.age > 20) {
                fs.writeFile(pathManOlder20, `${JSON.stringify(user)}`, err => {
                    console.log(err);
                });
            }
        }
    })
};

folderCreator(nameFolders)
userCreator(users);

