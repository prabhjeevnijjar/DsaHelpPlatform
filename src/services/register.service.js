const User = require("../database/model/users.model");
const jwt = require("jsonwebtoken");
async function createUser(userBody, res) {
  const emailExist = await User.findOne({ email: userBody.email });
  if (emailExist) {
    res.status(400).json({ message: "email already exists" });
  } else {
    const user = await new User(userBody);
    await user
      .save()
      .then((usr) => {
        console.log(usr);
        res.status(201).json({ message: "You have Successfuly Registerd" });
      })
      .catch((err) => {
        res.status(400).json({ errorR: err });
      });
  }
}
module.exports = {
  createUser,
};
