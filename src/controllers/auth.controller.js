const { createUser } = require("../services/register.service");
const bcrypt = require("bcrypt");
const User = require("../database/model/users.model");
const jwt = require("jsonwebtoken");

async function createNewUser(body, res) {
  // let body = req.body;
  let fname = body.FirstName;
  let lname = body.LastName;
  let email = body.Email;
  let password = body.Password;
  let Cpassword = body.PasswordConfirmation;
  //hashing the password
  console.log(body.FirstName, body.LastName, body.Email, body.Password);
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  let userBody = {
    firstname: fname,
    lastname: lname,
    email: email,
    password: hashedPassword,
  };
  await createUser(userBody, res);

  // res.status(201).send(user);
}
async function signin(req, res) {
  console.log(req.body.email, req.body.password);
  const emailExist = await User.findOne({ email: req.body.email });

  if (!emailExist) {
    console.log("yo");
    res.status(404).json({ message: "email does not exist" });
  } else {
    console.log("email found");

    const checkpassword = await bcrypt.compare(
      req.body.password,
      emailExist.password
    );
    if (!checkpassword) {
      res.status(404).json({ message: "wrong password" });
    } else {
      console.log("password correct");

      try {
        const token = await jwt.sign(
          { _id: emailExist.id },
          "process.env.SECRET"
        );
        console.log(token);
        res
          .status(200)
          .json({ success: 1, message: "Login Success", token: token });
      } catch (error) {
        res.status(400).send(error);
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
  console.log(req.user);
  try {
    const user = await User.findById(req.user._id);
    res.json(user);
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
}

module.exports = {
  createNewUser,
  signin,
  logout,
};
