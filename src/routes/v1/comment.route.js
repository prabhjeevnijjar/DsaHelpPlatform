const router = require("express").Router();
const {
  postComment,
  getComment,
} = require("../../controllers/comment.controller");
const { authenticateToken } = require("../../middlewares/authentication/auth");

router.post(
  "/comment",
  authenticateToken,
  (req, res, next) => postComment(req, res, next)
);

router.get("/comment", authenticateToken, getComment);

module.exports = router;
