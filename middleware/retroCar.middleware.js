const Boom = require('@hapi/boom');

const RetroCar = require('../db/RetroCar');
const {createCarValidator} = require('../joi_validator/cars.validator');

module.exports = {
    uniqBrandMiddleware: async (req, res, next) => {
        try {
            const {brand} = req.body;
            const carByBrand = await RetroCar.findOne({brand});

            if (carByBrand) {
                throw Boom.badData('Brand already exist');
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
                throw Boom.badData('Invalid year');
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
                throw Boom.badData('Invalid price');
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
                throw Boom.badData('This brand does not exist');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    isCreateDataValid: (req, res, next) => {
        try {
            const {error, value} = createCarValidator.validate(req.body);

            if (error) {
                throw Boom.badData(error.details[0].message);
            }

            req.body = value;

            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
