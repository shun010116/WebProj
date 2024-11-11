const mongoose = require('mongoose');

const reservationSchema = new  mongoose.Schema({
    restaurant_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reservation_data: Date,
    num_guests: Number,
});

module.exports = mongoose.model('Reservation', reservationSchema);