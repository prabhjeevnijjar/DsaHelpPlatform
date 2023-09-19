const router = require("express").Router();
const { authenticateToken, authenticateTokenElective } = require("../../middlewares/authentication/auth");
const {
  createResource,
  getResources,
  upvote,
  downvote,
  bookmarkResource,
  getBookmarks,
  getResourceById
} = require("../../controllers/resource.controller");

router.get(
  "/resource",  
  // (req, res, next) => authenticateTokenElective(req, res, next),
  (req, res) => getResources(req, res)
);

router.get("/resource-id", (req, res) => getResourceById(req, res));

router.post(
  "/resource",
  (req, res, next) => authenticateToken(req, res, next),
  (req, res) => createResource(req, res)
);

router.post(
  "/bookmark",
  (req, res, next) => authenticateToken(req, res, next),
  (req, res) => bookmarkResource(req, res)
);

router.get(
  "/bookmark",
  (req, res, next) => authenticateToken(req, res, next),
  (req, res) => getBookmarks(req, res)
)

router.put(
  "/up-vote",
  (req, res, next) => authenticateToken(req, res, next),
  (req, res) => upvote(req, res)
  );

router.put("/down-vote", authenticateToken, downvote);

module.exports = router;
