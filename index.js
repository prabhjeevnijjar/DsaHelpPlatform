const express = require('express');
// var path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const cors = require("cors");
const authh = require('./src/routes/v1/auth.route');


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_ADDRESS, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connection to MongoDb successful");
    }
});
app.use('/api', authh);
app.get('/homepage', (req, res) => {
    res.json({
        message: "success"
    });
});

app.listen(process.env.SERVER_PORT, () => {
    console.log("connected to port: ", process.env.SERVER_PORT);
})