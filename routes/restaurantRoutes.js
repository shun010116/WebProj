const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

router.route('/')
    .get(restaurantController.getRestaurants)
    .post(restaurantController.createRestaurant);
router.route('/:category')
    .get(restaurantController.getRestaurantsByCategory);
router.route('/:category/:id')
    .get(restaurantController.getRestaurantById)
    .put(restaurantController.updateRestaurant);

module.exports = router;