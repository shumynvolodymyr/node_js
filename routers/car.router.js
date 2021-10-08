const router = require('express').Router();

const car = require('../middleware/retroCar.middleware');
const controller = require("../controllers/cars.controller");

router.get('/', controller.getCarsController);
router.post('/', car.uniqBrandMiddleware, car.yearValidMiddleware, car.minPriceMiddleware, controller.createCarController);

router.get('/:brand', car.searchBrandMiddleware, controller.getCarsByBrandController);
router.put('/:brand',car.searchBrandMiddleware, controller.updateCarController);
router.delete('/:brand', car.searchBrandMiddleware, controller.deleteCarController);

module.exports = router;
