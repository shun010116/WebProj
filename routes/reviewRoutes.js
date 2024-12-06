const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const reviewController = require('../controllers/reviewController');
const verifyToken = require('../middleware/verifyToken');

router.use(cookieParser());

router.route('/:id')
    .get(reviewController.getReviews)
    .post(verifyToken, reviewController.addReview);

module.exports = router;