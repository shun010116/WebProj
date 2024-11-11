const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
//const authMiddleware = require('../middleware/authMiddleware');

router.post('/', /*authMiddleware,*/ reservationController.createReservation);

module.exports = router;