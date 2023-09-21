const router = require("express").Router();
const multer = require("multer");

const { authenticateToken } = require("../../middlewares/authentication/auth");
const {getProfile, updateMyProfile, getMyPosts, getMyLiked, getMyCommented, updateMyProfileImg} = require("../../controllers/profile.controller");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get( "/",
    (req, res, next) => authenticateToken(req, res, next),
    (req, res, next) => getProfile(req, res, next)
);

router.post(
    "/",
    (req, res, next) => authenticateToken(req, res, next),
    (req, res, next) => updateMyProfile(req, res, next)
);

router.post(
    "/profile-img",
    upload.single("profileImg"), // upload detects image with name profileImg
    (req, res, next) => authenticateToken(req, res, next),
    (req, res, next) => updateMyProfileImg(req, res, next)
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
