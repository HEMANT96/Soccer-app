var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var BookingModel = mongoose.model('booking');




router.post('/add-booking', async function (req, res) {
    let isExist = await BookingModel.findOne({
        centre_id: req.body.centre_id,
    });
    if (isExist) {
        res.sendError("BOK001")
        return;
    } else {

        let newBooking = new BookingModel();
        newBooking.centre_id = req.body.centre_id;
        newBooking.user_id = req.body.user_id;
        newBooking.start_time = req.body.start_time;
        newBooking.end_time = req.body.end_time;
        newBooking.booking_date = req.body.booking_date;





        await newBooking.save();
        res.sendSuccess(newBooking);

    }

});

router.post('/update-bookingstatus/:id', async function (req, res) {
    let isExist = await BookingModel.findOne({ _id: req.params.id });

    if (isExist) {
        let result = await BookingModel.updateOne({

            _id: req.params.id,
        },

            {
                $set: {
                   booking_status:req.body.booking_status
                },
            },
            {
                new: true,
            },

        );
        res.sendSuccess(result)
        // return result;
    } else {
        // isExist = false
        // return isExist;
        res.sendError("BOK002")
    }

});



router.get('/bookingbyId/:id', async function (req, res) {

    let bookings = await BookingModel.findById({ _id: req.params.id }).populate('centre_id');
    res.sendSuccess(bookings)


});


// router.get('/mybookings', async function (req, res) {
   
//     let bookings = await BookingModel.find({ user_id: req.params.id });
//     res.sendSuccess(bookings)
// });

router.get('/mybookings', async function (req, res) {

    let isExist = await BookingModel.find({ user_id: req.body.user_id }).populate('centre_id');
    res.sendSuccess(isExist);


});

router.get('/all-bookings', async function (req, res) {

    let bookings = await BookingModel.find().populate(['centre_id', 'user_id' ]);
    res.sendSuccess(bookings);
});













module.exports = router;