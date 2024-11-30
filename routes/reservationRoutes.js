const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

router.route('/:id')
    .get(reservationController.makeReservation)
    .post(reservationController.createReservation);

module.exports = router;