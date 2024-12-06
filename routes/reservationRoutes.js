const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const checkLogin = require('../middleware/checkLogin');
const verifyToken = require('../middleware/verifyToken');
const reservationController = require('../controllers/reservationController');

router.use(cookieParser());

router.route('/:id')
    .get(checkLogin, verifyToken, reservationController.makeReservation)
    .post(checkLogin, verifyToken, reservationController.createReservation);

module.exports = router;