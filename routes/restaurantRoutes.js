const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');
const categoryController = require('../controllers/categoryController');

router.route('/')
    .get(restaurantController.getRestaurants)
    .post(restaurantController.createRestaurant);
router.route('/korean')
    .get(categoryController.getKorean);
router.route('/japanese')
    .get(categoryController.getJapanese);
router.route('/chinese')
    .get(categoryController.getChinese);
router.route('/western')
    .get(categoryController.getWestern);
router.route('/asian')
    .get(categoryController.getAsian);
router.route('/grilled')
    .get(categoryController.getGrilled);
router.route('/:id')
    .get(restaurantController.getRestaurantById)
    .put(restaurantController.updateRestaurant);


module.exports = router;