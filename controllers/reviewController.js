const Restaurant = require('../models/Restaurant');
const asyncHandler = require("express-async-handler");

// 리뷰 조회
// GET /review/:id
const getReviews = asyncHandler(async (req, res) => {
    const restaurant = await Restaurant.findById(req.params.id);
    if(!restaurant) return res.status(404).render('404', {
        title : '404'
    })
    res.render('review', {
        title : 'Add Reivew',
        token : req.cookies.token,
        restaurant : restaurant.rest_name,
        restaurantId : req.params.id,
    })
})

// 리뷰 작성
// POST /review/:id
const addReview = asyncHandler(async (req, res) => {
    const { rating, content } = req.body;
    const restaurant = await Restaurant.findById(req.params.id);

    if(!restaurant) return res.status(404).render('404', {
        title : '404'
    });

    restaurant.reviews.push({ user_id: req.user.id, rating, content });
    restaurant.total_reviews++;
    restaurant.average_rating = restaurant.reviews.reduce((acc, review) => acc + review.rating, 0) / restaurant.total_reviews;

    await restaurant.save();
    // res.status(201).json({ message: 'Review added successfully' });
    let url = '/restaurants/' + restaurant.category + '/' + req.params.id;
    url = decodeURI(url);
    res.status(201).redirect(url);
});

// 리뷰 삭제
// DELETE //review/:id
const deleteReview = asyncHandler(async (req, res) => {
    const reviewId = mongoose.Types.ObjectId(req.query.id);
    const restaurant = await Restaurant.findOne({ 'reviews._id': reviewId });

    if(restaurant) {
        restaurant.reviews.pull({ _id: reviewId });
        await restaurant.save();
    }


    res.redirect("back");
});

module.exports = {
    getReviews,
    addReview,
    deleteReview
}