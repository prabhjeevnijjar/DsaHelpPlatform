const jwt = require("jsonwebtoken");

async function authenticateToken(req, res, next) {
  // let token = await req.cookies;
  // console.log(token.jwt);
  // //token.toString();
  // if (token == null) return res.sendStatus(401);

  // await jwt.verify(token.jwt, "process.env.SECRET", (err, user) => {
  //     console.log(err);
  //     if (err) return res.sendStatus(403);
  //     req.user = user;
  //     next();
  // });
  req.user = "60b062beb3bcbb267cef8451";
  next();
}
//TODO: make admin auth
module.exports = {
  authenticateToken,
};
