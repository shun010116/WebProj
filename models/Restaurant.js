const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: Number,
    content: String,
    created_at: { type: Date, default: Date.now },
});

const restaurantSchema = new mongoose.Schema({
    name: String,
    location: String,
    category: String,
    average_rating: { type: Number, default: 0 },
    total_reviews: { type: Number, default: 0 },
    reviews: [reviewSchema],
});

module.exports = mongoose.model('Restaurant', restaurantSchema);