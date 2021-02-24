var mongoose = require('mongoose');

var CentreSchema = new mongoose.Schema({
    centre_name: String,
    phone_number: String,
    address: String,
    start_time: String,
    end_time: String,
    total_slots: String,
    created_at: {
        type: Date,
        default: Date.now
    },
    image: String,
    description:String,
    long:String,
    lat:String,



});

module.exports = mongoose.model(
    'centre', CentreSchema, 'Centres');