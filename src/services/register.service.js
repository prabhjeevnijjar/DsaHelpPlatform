const User = require("../database/model/users.model");
const jwt = require("jsonwebtoken");

async function createUser(userBody, res) {
  const emailExist = await User.findOne({ email: userBody.email });

  if (emailExist) res.status(400).json({ message: "email already exists" });
   else {
    const user = await new User(userBody);
    await user
      .save()
      .then((usr) => res.status(200).json({ code: 200, success: true, message: "Sign Up Success", }) )
      .catch((err) => res.status(400).json({ code: 400, success: false, message: "Sign Up Failed", }) );
  }
}

module.exports = { createUser };
