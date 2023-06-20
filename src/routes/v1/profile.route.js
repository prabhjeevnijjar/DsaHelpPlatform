const router = require("express").Router();
const { authenticateToken } = require("../../middlewares/authentication/auth");
const {getProfile, updateMyProfile, getMyPosts, getMyLiked, getMyCommented} = require("../../controllers/profile.controller");

router.get( "/",
    (req, res, next) => authenticateToken(req, res, next),
    (req, res, next) => getProfile(req, res, next)
);

router.post(
    "/",
    (req, res, next) => authenticateToken(req, res, next),
    (req, res, next) => updateMyProfile(req, res, next)
);

router.get(
    "/profile/my-posts",
    (req, res, next) => authenticateToken(req, res, next),
    (req, res, next) => getMyPosts(req, res, next)
);

router.get(
    "/profile/my-liked",
    (req, res, next) => authenticateToken(req, res, next),
    (req, res, next) => getMyLiked(req, res, next)
);

router.get(
    "/profile/my-commented",
    (req, res, next) => authenticateToken(req, res, next),
    (req, res, next) => getMyCommented(req, res, next)
);

module.exports = router;
