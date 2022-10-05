const router = require("express").Router();
const {
  createNewUser,
  signin,
  checkEmailExists,
} = require("../../controllers/auth.controller");
let {
  userRegistrationValidationRules,
  validate,
} = require("../../middlewares/validation/validator");

router.post("/register", (req, res) => {
  createNewUser(req.body, res);
});

router.post("/check-email", (req, res) => {
  checkEmailExists(req, res);
});

router.post("/login", (req, res) => {
  signin(req, res);
});

router.get("/logout", (req, res) => {
  logout(req, res);
});
module.exports = router;
