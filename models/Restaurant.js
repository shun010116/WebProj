const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: Number,
    content: String,
    created_at: { type: Date, default: Date.now },
});

const restaurantSchema = new mongoose.Schema({
    rest_name: String,
    rest_addr: String,
    rest_telno: String,
    category: String,
    average_rating: { type: Number, default: 0 },
    total_reviews: { type: Number, default: 0 },
    reviews: [reviewSchema],
});

const Review = mongoose.model('Review', reviewSchema);
const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = {
    Review,
    Restaurant
}