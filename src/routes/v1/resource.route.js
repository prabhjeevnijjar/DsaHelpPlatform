const router = require("express").Router();
const { authenticateToken } = require("../../middlewares/authentication/auth");
const {
  createResource,
  getResources,
  upvote,
  downvote,
} = require("../../controllers/resource.controller");
router.get("/resource", getResources);
router.post("/resource", authenticateToken, createResource);
/*URL:http://localhost:3000/homepage/resource
DATA:
{   
        "name": "Trees", 
        "resourcetype": "dsa",
        "resourcesubtype": "arrays",
        "resourcelink": "link",
        "resourceauthor": "me",
        "resourcestudytype": "Video",
        "status": "Published"
} */
// router.put("/resource", );
// router.put("/resource", );
//upvote
//downvote
//review
router.put("/up-vote", authenticateToken, upvote);
router.put("/down-vote", authenticateToken, downvote);

module.exports = router;
