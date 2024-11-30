const Reservation = require('../models/Reservation');
const asyncHandler = require("express-async-handler");

// 예약 페이지
// GET /reservations/:id
const makeReservation = (req, res) => {
    res.render('reservations', {
        title : 'Reservation',
        reservation : req.params.id
    })
};

// 예약하기
// POST /reservations/:id
const createReservation = asyncHandler(async (req, res) => {
    const { restaurant_id, reservation_date, num_guests } = req.body;
    const reservation = new Reservation({ restaurant_id: req.params.id, user_id: req.user_id, reservation_date, num_guests });
    await reservation.save();
    res.status(201).json({ message: 'Reservation created successfully' });
});

module.exports = {
    makeReservation,
    createReservation
}