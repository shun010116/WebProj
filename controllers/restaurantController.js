const Restaurant = require('../models/Restaurant');

// 음식점 목록 조회
exports.getRestaurants = async (req, res) => {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
};

// 특정 음식점 상세 조회
exports.getRestaurantById = async (req, res) => {
    const restaurant = await Restaurant.findById(req.params.id);
    if(!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
    res.json(restaurant);
};