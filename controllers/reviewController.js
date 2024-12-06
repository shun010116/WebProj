const Restaurant = require('../models/Restaurant');
const asyncHandler = require("express-async-handler");

// 리뷰 작성
exports.addReview = asyncHandler(async (req, res) => {
    const { rating, content } = req.body;
    const restaurant = await Restaurant.findById(req.params.id);

    if(!restaurant) return res.status(404).json({ message: 'Restaurant not found' });

    restaurant.reviews.push({ user_id: req.user.id, rating, content });
    restaurant.total_reviews++;
    restaurant.average_rating = restaurant.reviews.reduce((acc, review) => acc + review.rating, 0) / restaurant.total_reviews;

    await restaurant.save();
    res.status(201).json({ message: 'Review added successfully' });
});