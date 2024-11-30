const Reservation = require('../models/Reservation');
const asyncHandler = require("express-async-handler");

// 예약 페이지
// GET /reservations/:id
const makeReservation = asyncHandler(async (req, res) => {
    const reservations = await Reservation.findById(req.params.id);
    res.render('reservations', {
        title : 'Reservation',
        reservation : reservations
    })
});

// 예약하기
// POST /reservations/:id
const createReservation = asyncHandler(async (req, res) => {
    const { reservation_date, num_guests } = req.body;
    const reservation = new Reservation({ restaurant_id, user_id: req.user_id, reservation_date, num_guests });
    await reservation.save();
    res.status(201).json({ message: 'Reservation created successfully' });
});

module.exports = {
    makeReservation,
    createReservation
}