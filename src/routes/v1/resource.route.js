const router = require("express").Router();
const { authenticateToken } = require("../../middlewares/authentication/auth");
const {
  createResource,
  getResources,
  upvote,
  downvote,
} = require("../../controllers/resource.controller");

router.get("/resource", getResources);

router.post(
  "/resource",
  (req, res, next) => authenticateToken(req, res, next),
  (req, res) => createResource(req, res)
);

router.put("/up-vote", authenticateToken, upvote);

router.put("/down-vote", authenticateToken, downvote);

module.exports = router;
