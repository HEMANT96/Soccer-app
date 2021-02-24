var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var UserModel = mongoose.model('user');




router.post('/register', async function (req, res) {
    let isExist = await UserModel.findOne({
        email: req.body.email,
    });
    if (isExist) {
        res.sendError("ACC003");
        return;
    } else {

        let newUser = new UserModel();
        newUser.email = req.body.email;
        newUser.password = req.body.password;
        newUser.phone_number = req.body.phone_number;
        newUser.first_name = req.body.first_name;
        newUser.last_name = req.body.last_name;
        newUser.gender = req.body.gender;
        newUser.address = req.body.address;

        await newUser.save();
        res.sendSuccess(newUser);

    }

});

router.post('/login', async function (req, res) {

    let isExist = await UserModel.findOne({ email: req.body.email });
    if (isExist) {
        if (isExist.password == req.body.password) {
            res.sendSuccess(isExist);
        } else {
            res.sendError("ACC001");
        }
    } else {
        res.sendError("ACC002");
    }
});

router.get('/all-users', async function (req, res) {

    let users = await UserModel.find();
    res.sendSuccess(users);
});


router.get('/userbyId/:id', async function (req, res) {

    let user = await UserModel.findById({ _id: req.params.id });
    res.sendSuccess(user)
});
router.post('/generate-otp', async function (req, res) {
    var otp = Math.floor(1000 * Math.random() + 9000);
    console.log(otp);



    let isExist = await UserModel.findOne({ phone_number: req.body.phone_number });
    if (isExist) {

        let result = await UserModel.updateOne({
            phone_number: req.body.phone_number,
        },
            {
                $set: {
                    otp: otp,

                },
            },
            {
                new: true,
            },

        );




        const accountSid = 'ACcf4efb1372b42f24b51fea296d534d7f';
        const authToken = '9dc61969ee0a833e0ba81c2c63bb36c2';
        const client = require('twilio')(accountSid, authToken);
        const country_code = "+91";
        const to_send = country_code + req.body.phone_number;

        client.messages
            .create({
                body: 'Your 4 digit code for ithours is - ' + otp,
                from: '+17744625692',
                to: to_send
            })
            .then(message => console.log(message.sid));

        res.sendSuccess({ data: result })


        // return result;
    } else {
        // isExist = false
        // return isExist;
        res.sendError("ACC004")
    }

});





router.post('/verify-otp', async function (req, res) {

    let isExist = await UserModel.findOne({ phone_number: req.body.phone_number });
    if (isExist) {
        if (isExist.otp == req.body.otp) {

            res.sendSuccess(isExist);

        } else {
            // return { isExist: false, msg: "Wrong otp" };
            res.sendError("ACC005");

        }
    }

    else {
        res.sendError("ACC004");
    }

    // res.status(200).send(toReturn);

});

router.post('/updatepassword', async function (req, res) {
    let isExist = await UserModel.findOne({ phone_number: req.body.phone_number });

    if (isExist) {
        let result = await UserModel.updateOne({

            phone_number: req.body.phone_number,
        },
            {
                $set: {
                    password: req.body.password,
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
        res.sendError("ACC006")
    }

});

router.post('/updateprofile', async function (req, res) {
    let isExist = await UserModel.findOne({ email: req.body.email });

    if (isExist) {
        let result = await UserModel.updateOne({

            email: req.body.email,
        },
            {
                $set: {
                    phone_number: req.body.phone_number,
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    gender: req.body.gender,
                    address: req.body.address,
                    image: req.body.image,
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
        res.sendError("ACC006")
    }

});




module.exports = router;