const Reservation = require('../models/Reservation');
const asyncHandler = require("express-async-handler");

exports.createReservation = asyncHandler(async (req, res) => {
    const { restaurant_id, reservation_date, num_guests } = req.body;
    const reservation = new Reservation({ restaurant_id, user_id: req.user_id, reservation_date, num_guests });
    await reservation.save();
    res.status(201).json({ message: 'Reservation created successfully' });
});