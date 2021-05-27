const router = require("express").Router();

router.get("/getallresources", fetchResource);
router.post("/newresource", createResource);
