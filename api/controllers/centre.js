var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var CentreModel = mongoose.model('centre');



router.post('/add', async function (req, res) {
    let isExist = await CentreModel.findOne({
        address: req.body.address,
    });
    if (isExist) {
        res.sendError("CEN001")
        return;
    } else {

        let newCentre = new CentreModel();
        newCentre.centre_name = req.body.centre_name;
        newCentre.address = req.body.address;
        newCentre.phone_number = req.body.phone_number;
        newCentre.start_time = req.body.start_time;
        newCentre.end_time = req.body.end_time;
        newCentre.total_slots = req.body.total_slots;
        newCentre.image = req.body.image;
        newCentre.description = req.body.description;
        newCentre.long = req.body.long;
        newCentre.lat = req.body.lat;



        await newCentre.save();
        res.sendSuccess(newCentre);

    }

});

router.get('/centres', async function (req, res) {

    let centres = await CentreModel.find();
    res.sendSuccess(centres);
});


router.get('/centrebyId/:id', async function (req, res) {

    let centre = await CentreModel.findById({ _id: req.params.id });
    res.sendSuccess(centre)


});

router.post('/center-update/:id', async function (req, res) {
    let isExist = await CentreModel.findOne({ _id: req.params.id });

    if (isExist) {
        let result = await CentreModel.updateOne({

            _id: req.params.id,
        },
            {
                $set: {
                    centre_name: req.body.centre_name,
                    address: req.body.address,
                    phone_number: req.body.phone_number,
                    start_time: req.body.start_time,
                    end_time: req.body.end_time,
                    total_slots: req.body.total_slots,
                    description:req.body.description,
                    image: req.body.image
                },
            },
            {
                new: true,
            },

        );
        res.sendSuccess(result);
        // return result;
    } else {
        // isExist = false
        // return isExist;
        res.sendError("CEN002")
    }

});











module.exports = router;