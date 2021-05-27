const router = require("express").Router();
const { authenticateToken } = require("../../middlewares/authentication/auth");
const {
  createResource,
  getAllResources,
} = require("../../controllers/recommendres.controller");
router.post("/recommend-resource", authenticateToken, createResource);

/*
USE CASE: user can recommend a new resource should be logged in
URL:http://localhost:3000/homepage/resource
JSON DATA:
{ 
"link": "link to the url",
"description": "something"
  },
*/
router.get("/recommend-resource", getAllResources);

module.exports = router;
