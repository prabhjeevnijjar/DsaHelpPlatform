const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
const authh = require("./src/routes/v1/auth.route");
const recommend = require("./src/routes/v1/recommendedres.route");
const resource = require("./src/routes/v1/resource.route");
const comment = require("./src/routes/v1/comment.route");
const profile = require("./src/routes/v1/profile.route");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


mongoose.connect(
  process.env.MONGODB_LOCAL_ADDRESS ||
    "mongodb+srv://prabhjeev:admin@testingcluster0.0fpxp.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) console.log(err);
    else console.log("Connection to MongoDb successful");
  }
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header( "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use("/api", authh);
app.use("/homepage", recommend);
app.use("/homepage", resource);
app.use("/homepage", comment);
app.use("/profile", profile);

app.listen(process.env.SERVER_PORT || 4000, () => {
  console.log("connected to port: ", process.env.SERVER_PORT);
});
