const RetroCars = require('../db/RetroCar');

module.exports = {
    getCarsController: async (req, res) => {
        try {
            res.json(await RetroCars.find());
        } catch (e) {
            res.json(e.message);
        }
    },

    getCarsByBrandController: async (req, res) => {
        try {
            const {brand} = req.params;
            const car = await RetroCars.findOne({brand});

            res.json(car);
        } catch (e) {
            res.json(e.message);
        }
    },

    createCarController: async (req, res) => {
        try {
            const newCar = await RetroCars.create(req.body);

            res.json(newCar);
        } catch (e) {
            res.json(e.message);
        }
    },

    updateCarController: async (req, res) => {
        try {
            const {brand} = req.params;
            await RetroCars.updateOne({brand}, {$set: req.body});

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
