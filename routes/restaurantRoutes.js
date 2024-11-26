const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

router.route('/')
    .get(restaurantController.getRestaurants)
    .post(restaurantController.createRestaurant);
router.route('/:id')
    .get(restaurantController.getRestaurantById)
    .put(restaurantController.updateRestaurant);

module.exports = router;