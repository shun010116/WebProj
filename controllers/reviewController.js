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

// 리뷰 업데이트 페이지
// GET /review/update/:id
const getUpdateReview = asyncHandler(async (req, res) => {
    const restaurant = await Restaurant.findById(req.params.id);
    if(!restaurant) return res.status(404).render('404', {
        title : '404'
    })
    res.render('updateReview', {
        title : 'Update Reivew',
        token : req.cookies.token,
        restaurant : restaurant.rest_name,
        restaurantId : req.params.id,
        reviewId : req.query.review_id
    })
})

// 리뷰 업데이트
// PUT /review/updtae/:id
const updateReview = asyncHandler(async (req, res) => {
    const reviewId = req.query.review_id;
    const restaurant = await Restaurant.findOne({ _id: req.params.id, 'reviews._id': reviewId });
    const { rating, content } = req.body;
    console.log(restaurant.reviews)

    const updateReview = await restaurant.reviews.findByIdAndUpdate(
        reviewId,
        {
            $set: {
                'reviews.$.rating': rating,
                'reviews.$.content': content
            }
        },
        { new: true }
    );

    res.redirect("/auth");
});

// 리뷰 삭제
// DELETE /review/:id
const deleteReview = asyncHandler(async (req, res) => {
    const reviewId = req.params.id

    const getRestaurantByReviewId = async (reviewId) => {
        const restaurant = await Restaurant.findOne({ 'reviews._id': reviewId }, { _id: 1 });
        return restaurant ? restaurant._id : null;
    };

    const restaurantId = await getRestaurantByReviewId(reviewId);

    const result = await Restaurant.findByIdAndUpdate(
        restaurantId, // 해당 Restaurant의 ID
        { 
            $pull: { reviews: { _id: reviewId } }, // reviews 배열에서 특정 _id를 가진 리뷰 제거
            $inc: { total_reviews: -1 } // total_reviews 값을 1 감소
        }, 
        { new: true } // 업데이트된 문서를 반환
    );

    // average_rating 재계산
    const restaurant = await Restaurant.findById(restaurantId);
    restaurant.average_rating = restaurant.reviews.reduce((acc, review) => acc + review.rating, 0) / restaurant.total_reviews;
    await restaurant.save();

    res.redirect('/auth');
});


module.exports = {
    getReviews,
    addReview,
    getUpdateReview,
    updateReview,
    deleteReview
}