const RetroCar = require('../db/RetroCar');

module.exports = {
    uniqBrandMiddleware: async (req, res, next) => {
        try {
            const {brand} = req.body;
            const carByBrand = await RetroCar.findOne({brand});

            if (carByBrand) {
                throw new Error('Brand already exist');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    yearValidMiddleware: (req, res, next) => {
        try {
            const {year} = req.body;

            if (year < 1885 || year > 1980) {
                throw new Error('Invalid year');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    minPriceMiddleware: (req, res, next) => {
        try {
            const {price} = req.body;

            if (price < 0) {
                throw new Error('Invalid price');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    searchBrandMiddleware: async (req, res, next) => {
        try {
            const {brand} = req.params;
            const car = await RetroCar.findOne({brand});

            if (!car) {
                throw new Error('This brand does not exist');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
