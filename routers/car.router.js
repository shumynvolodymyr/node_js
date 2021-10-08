const {getCars, getCarsByBrand, createCar, deleteCar, updateCar} = require('../controllers/cars.controller');
const car = require('../middleware/retroCar.middleware');
const router = require('express').Router();

router.get('/', getCars);
router.post('/', car.uniqBrandMiddleware, car.yearValidMiddleware, car.minPriceMiddleware, createCar);

router.get('/:brand', car.searchBrandMiddleware, getCarsByBrand);
router.put('/:brand',car.searchBrandMiddleware, updateCar);
router.delete('/:brand', car.searchBrandMiddleware, deleteCar);

module.exports = router;
