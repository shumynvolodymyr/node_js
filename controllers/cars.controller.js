const RetroCars = require('../db/RetroCar');
const {hash} = require('../service/car.service');
const {carNormalizator} = require('../util/car.util');

module.exports = {
    getCarsController: async (req, res) => {
        try {
            const cars = await RetroCars.find().lean();

            const newCar = cars.map(car => carNormalizator(car));

            res.json(newCar);
        } catch (e) {
            res.json(e.message);
        }
    },

    getCarsByBrandController: async (req, res) => {
        try {
            const {brand} = req.params;
            const car = await RetroCars.findOne({brand}).lean();
            const normalizeCar = carNormalizator(car);

            res.json(normalizeCar);
        } catch (e) {
            res.json(e.message);
        }
    },

    createCarController: async (req, res) => {
        try {
            const {password} = req.body;
            const hashPassword = await hash(password);

            await RetroCars.create({...req.body, password: hashPassword});

            res.json(`Car ${req.body.brand} was created`);
        } catch (e) {
            res.json(e.message);
        }
    },

    updateCarController: async (req, res) => {
        try {
            const {brand} = req.params;
            const {password} = req.body;
            const hashPassword = await hash(password);

            await RetroCars.updateOne({brand}, {$set: {...req.body, password: hashPassword}});

            res.json(`Car ${brand} updated`);
        } catch (e) {
            res.json(e.message);
        }
    },

    deleteCarController: async (req, res) => {
        try {
            const {brand} = req.params;

            await RetroCars.deleteOne({brand});

            res.json(`${brand} was deleted`);
        } catch (e) {
            res.json(e.message);
        }
    },
};
