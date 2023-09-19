const router = require("express").Router();
const { authenticateToken } = require("../../middlewares/authentication/auth");
const {getProfile, updateMyProfile, getMyPosts, getMyLiked, getMyCommented} = require("../../controllers/profile.controller");

router.get( "/",
    (req, res, next) => authenticateToken(req, res, next),
    (req, res, next) => getProfile(req, res, next)
);
/* body */
/*
{
    userName: "",
    firstName: "",
    lastName: "",
    profileImg: ""
}
*/
router.post(
    "/",
    (req, res, next) => authenticateToken(req, res, next),
    (req, res, next) => updateMyProfile(req, res, next)
);

router.get(
    "/my-posts",
    (req, res, next) => authenticateToken(req, res, next),
    (req, res, next) => getMyPosts(req, res, next)
);

router.get(
    "/my-liked",
    (req, res, next) => authenticateToken(req, res, next),
    (req, res, next) => getMyLiked(req, res, next)
);

router.get(
    "/my-commented",
    (req, res, next) => authenticateToken(req, res, next),
    (req, res, next) => getMyCommented(req, res, next)
);

module.exports = router;
