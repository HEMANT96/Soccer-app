var mongoose = require('mongoose');


var BookingSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'user'
    },
    centre_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'centre'
    },
    start_time: String,
    end_time: String,
    booking_status: { 
        type: String,
        default: 'new'
    },
    created_at: {
        type: Date,
        default: Date.now
      },
    booking_date: {
        type: Date
    },
});

module.exports = mongoose.model(
    'booking', BookingSchema, 'Bookings');