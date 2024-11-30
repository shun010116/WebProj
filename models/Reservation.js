const mongoose = require('mongoose');

const reservationSchema = new  mongoose.Schema(
    {
    restaurant_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reservation_person: { type: String, required: true },
    reservation_date: { type: Date, required: true },
    num_guests: { type: Number, required: true }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Reservation', reservationSchema);