const { createUser } = require("../services/register.service");
const bcrypt = require("bcrypt");
const User = require("../database/model/users.model");
const jwt = require("jsonwebtoken");
const { default: jwtDecode } = require("jwt-decode");

async function createNewUser(body, res) {
  // let body = req.body;
  let fname = body.FirstName;
  let lname = body.LastName;
  let email = body.Email;
  let password = body.Password;
  let Cpassword = body.PasswordConfirmation;
  //hashing the password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  let userBody = {
    firstname: fname,
    lastname: lname,
    email: email,
    password: hashedPassword,
  };
  await createUser(userBody, res);
}

async function signin(req, res) {
  const emailExist = await User.findOne({ email: req.body.email });
  if (!emailExist) {
    res.status(404).json({
      code: 404,
      success: false,
      isLogin: false,
      message: "Email does not exist",
      status: false,
    });
  } else {
    const checkpassword = await bcrypt.compare(
      req.body.password,
      emailExist.password
    );
    if (!checkpassword) {
      res.status(400).json({
        code: 400,
        success: false,
        isLogin: false,
        message: "Invalid password",
        status: false,
      });
    } else {
      try {
        const token = await jwt.sign(
          { first_name: emailExist.firstname, email: emailExist.email },
          "process.env.SECRET"
        );

        res.status(200).json({
          code: 200,
          success: true,
          isLogin: true,
          message: "Login Successful !",
          status: true,
          data: { token: token },
        });
      } catch (error) {
        res.status(400).json({
          code: 400,
          success: false,
          isLogin: false,
          message: "Something went wrong",
        });
      }
    }
  }
}

async function logout(req, res) {
  cookie = await req.cookies;

  res.cookie("jwt", "", { expires: new Date(0) });

  res.redirect("/signin");
}

async function getCurrentUser(req, res) {
  try {
    const user = await User.findById(req.user._id);
    res.json(user);
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
}

async function checkEmailExists(req, res) {
  if (req.body.email) {
    const emailExist = await User.findOne({ email: req.body.email });
    if (!emailExist) {
      res.status(200).json({
        code: 404,
        success: false,
        message: "Email does not exist",
        status: false,
      });
    } else {
      res.status(200).json({
        code: 200,
        success: true,
        message: "Email found",
        status: true,
      });
    }
  }
}
async function checkTokenIsValid(req, res) {
  console.log("in the function", req.headers.authorization.split(" ")[1]);
  if (req.headers.authorization && req.headers.authorization.split(" ")[1]) {
    console.log("----", req.headers.authorization.split(" ")[1]);
    const decodedEmail = jwtDecode(
      req.headers.authorization.split(" ")[1]
    ).email;
    console.log({ decodedEmail });
    const emailExist = await User.findOne({ email: decodedEmail });
    console.log({ emailExist });
    if (!emailExist) {
      res.status(404).json({
        code: 404,
        success: false,
        message: "Token validation failed",
        status: false,
      });
    } else {
      try {
        const token = await jwt.sign(
          { first_name: emailExist.firstname, email: emailExist.email },
          "process.env.SECRET"
        );
        res.status(200).json({
          code: 200,
          success: true,
          message: "Token validation success",
          data: { token: token },
          status: true,
        });
      } catch (e) {
        res.status(400).json({
          code: 400,
          success: false,
          message: "Something went wrong",
          status: false,
        });
      }
    }
  } else {
    res.status(404).json({
      code: 404,
      success: false,
      message: "No data received from client",
      status: false,
    });
  }
}

module.exports = {
  createNewUser,
  signin,
  logout,
  checkEmailExists,
  checkTokenIsValid,
};
