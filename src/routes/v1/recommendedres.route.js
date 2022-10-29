const router = require("express").Router();
const { authenticateToken } = require("../../middlewares/authentication/auth");
const {
  createResource,
  getAllResources,
} = require("../../controllers/recommendres.controller");

router.post("/recommend-resource", authenticateToken, createResource);

router.get("/recommend-resource", getAllResources);

module.exports = router;
