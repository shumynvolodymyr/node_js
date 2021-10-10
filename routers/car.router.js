const router = require('express').Router();

const car = require('../middleware/retroCar.middleware');
const controller = require('../controllers/cars.controller');
const {isCreateDataValid} = require('../middleware/retroCar.middleware');

router.get(
    '/',
    controller.getCarsController
);
router.post(
    '/',
    isCreateDataValid,
    car.uniqBrandMiddleware,
    car.yearValidMiddleware,
    car.minPriceMiddleware,
    controller.createCarController
);

router.get(
    '/:brand',
    car.searchBrandMiddleware,
    controller.getCarsByBrandController
);
router.put(
    '/:brand',
    isCreateDataValid,
    car.searchBrandMiddleware,
    controller.updateCarController
);
router.delete(
    '/:brand',
    car.searchBrandMiddleware,
    controller.deleteCarController
);

module.exports = router;
