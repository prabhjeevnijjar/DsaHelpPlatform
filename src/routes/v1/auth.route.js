const router = require("express").Router();
const { userRegistrationValidationRules, validate} = require("../../middlewares/validation/validator");
const {
  createNewUser,
  signin,
  checkEmailExists,
  checkTokenIsValid,
} = require("../../controllers/auth.controller");

router.post("/register", (req, res) => {
  createNewUser(req.body, res);
});

router.post("/check-email", (req, res) => {
  checkEmailExists(req, res);
});

router.post("/login", (req, res) => {
  signin(req, res);
});

router.post("/check-token", (req, res) => {
  checkTokenIsValid(req, res);
});

module.exports = router;
