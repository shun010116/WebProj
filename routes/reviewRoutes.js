const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const reviewController = require('../controllers/reviewController');
const checkLogin = require('../middleware/checkLogin');
const verifyToken = require('../middleware/verifyToken');

router.use(cookieParser());

router.route('/:id')
    .get(reviewController.getReviews)
    .post(checkLogin, verifyToken, reviewController.addReview)
    .delete(checkLogin, verifyToken, reviewController.deleteReview);
router.route('/update/:id')
    .get(reviewController.getUpdateReview)
    .put(reviewController.updateReview);

module.exports = router;