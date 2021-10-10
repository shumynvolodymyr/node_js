const carDB = require('../db/RetroCar');
const Boom = require('@hapi/boom');

const {compare} = require('../service/car.service');

module.exports = {
    loginController: async (req, res) => {
        try {
            const {brand, password} = req.body;
            const isCar = await carDB.findOne({brand});

            if (!isCar) {
                throw Boom.notFound('Wrong brand or password');
            }

            await compare(password, isCar.password);

            res.json(`Welcome ${brand}`);
        } catch (e) {
            res.json(e.message);
        }
    }
};
