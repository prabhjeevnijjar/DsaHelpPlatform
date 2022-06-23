const jwt = require("jsonwebtoken");

async function authenticateToken(req, res, next) {
  const token = req.headers["x-access-token"];
  console.log("token received from frontend", token);
  if (token) {
    await jwt.verify(token, "process.env.SECRET", (err, decoded) => {
      if (err) {
        console.log(err);
        res.status(401).json({ success: 0, message: "Failed to authenticate" });
        return
      } else {
        console.log("decoded jwt:", decoded._id);
        req.user = decoded._id;
        next();
      }
    });
  } else {
    res.status(401).json({ success: 0, message: "Auth Token not sent" });
    return
  }
}
//TODO: make admin auth
module.exports = {
  authenticateToken,
};
