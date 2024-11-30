const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const checkLogin = require('../middleware/checkLogin');
const reservationController = require('../controllers/reservationController');

router.use(cookieParser());

router.route('/:id')
    .get(checkLogin, reservationController.makeReservation)
    .post(checkLogin, reservationController.createReservation);

module.exports = router;