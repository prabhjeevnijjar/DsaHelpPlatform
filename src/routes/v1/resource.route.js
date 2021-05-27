const router = require("express").Router();
const { authenticateToken } = require("../../middlewares/authentication/auth");
const {
  createResource,
  getResources,
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
module.exports = router;
