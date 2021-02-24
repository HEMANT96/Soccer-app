const express = require('express');
const bodyParser = require('body-parser');

require('./models/booking');
require('./models/centre');
require('./models/user');


const port = 4200;
const app = express();
var mongoose = require('mongoose');
// Connecting to database 
var query = 'mongodb://sausr:sausr@35.224.52.114 :27017/saapp'

var cors = require('cors')
app.use(cors());

const db = (query);
mongoose.Promise = global.Promise;

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (error) {
    if (error) {
        console.log("Error!" + error);
    }
});

app.listen(port, function () {
    console.log("Server is listening at port:" + port);
});

// Parses the text as url encoded data 
app.use(bodyParser.urlencoded({ extended: true }));

// Parses the text as json 
app.use(bodyParser.json());

var Core = require('./helpers/response');
var core = new Core();

app.use(function (req, res, next) {
    console.log('Time:', Date.now());
    res.sendSuccess = (data) => {
        var toReturn = core.wrapResponse(data, null);
        res.send(toReturn);
    }
    res.sendError = (erroCode) => {
        var toReturn = core.wrapResponse(null, erroCode);
        res.send(toReturn);
    }
    next()
})



const user = require('./controllers/user');
const centre = require('./controllers/centre');
const booking = require('./controllers/booking');


app.get('/ping/status', (req,res) => {
    res.send({msg: "API is running with current time " + new Date()});
})

app.use('/user', user);
app.use('/centre', centre);
app.use('/booking', booking);

