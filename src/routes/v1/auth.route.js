
const router = require("express").Router();
const { createNewUser, signin } = require('../../controllers/auth.controller');
let { userRegistrationValidationRules, validate } = require('../../middlewares/validation/validator');
router.get("/registration", (req, res) => {
    //res.render("registration");
});
console.log("here");
router.post("/register", (req, res) => {
    createNewUser(req.body, res);
});
router.get("/login", (req, res) => {
    res.json({ hi: "hi" });
});
router.post("/login", (req, res) => {
    signin(req, res);
});
router.get("/logout", (req, res) => {
    logout(req, res);
})
module.exports = router;