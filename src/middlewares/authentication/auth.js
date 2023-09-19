const User = require("../../database/model/users.model");
const { default: jwtDecode } = require("jwt-decode");

async function authenticateToken(req, res, next) {
  if (req.headers.authorization && req.headers.authorization.split(" ")[1]) {
    const decodedEmail = jwtDecode( req.headers.authorization.split(" ")[1] ).email;
    
    const emailExist = await User.findOne({ email: decodedEmail });
console.log({emailExist})
    if (!emailExist) {
      res.status(401).json({
        code: 401,
        success: false,
        message: "User not authorized",
        status: false,
      });
    } else {
      req.user = emailExist._id;
      next();
    }
  } else {
    res.status(401).json({
      code: 401,
      success: false,
      message: "User not authorized",
      status: false,
    });
  }
}
// if auth header exist send user id if not exist then also continue
async function authenticateTokenElective(req, res, next) { 
  if (req.headers.authorization && req.headers.authorization.split(" ")[1]) {
    const decodedEmail = jwtDecode( req.headers.authorization.split(" ")[1] ).email;
    const emailExist = await User.findOne({ email: decodedEmail }).then(()=>{}).catch(()=>{});

    if (!emailExist) next();
    else {
      req.user = emailExist._id;
      next();
    }
  } else next();
}

module.exports = {
  authenticateToken,
  authenticateTokenElective
};
