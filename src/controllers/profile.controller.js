
const {getProfileData, updateMyProfileData, getMyPostsData, getMyLikedData, getMyCommentedData } = require("../services/profile.service");
const { responseHandler } = require("../helpers/responseHandler");

module.exports = {
    async getProfile (req, res, next)  {
        try {
             await getProfileData(req, res, next);
        } catch(err) {
            responseHandler({
                statusCode: 404,
                errCode: 404,
                errMsg: "Something went wrong",
                errStatus: false,
                data: ''
            }, req, res, next);
        }
    },
    async updateMyProfile (req, res, next) {
        try {
            await updateMyProfileData();
        } catch(err) {
            responseHandler({
                statusCode: 404,
                errCode: 404,
                errMsg: "Something went wrong",
                errStatus: false,
                data: ''
            }, req, res, next);
        }
    },
    async getMyPosts (req, res, next) {
        try {
            await getMyPostsData();

        } catch(err) {
            responseHandler({
                statusCode: 404,
                errCode: 404,
                errMsg: "Something went wrong",
                errStatus: false,
                data: ''
            }, req, res, next);
            
        }
    },
    async getMyLiked (req, res, next) {
        try {
            await getMyLikedData();

        } catch(err) {
            responseHandler({
                statusCode: 404,
                errCode: 404,
                errMsg: "Something went wrong",
                errStatus: false,
                data: ''
            }, req, res, next);
            
        }
    },
    async getMyCommented (req, res, next) {
        try {
            await getMyCommentedData();

        } catch {
            responseHandler({
                statusCode: 404,
                errCode: 404,
                errMsg: "Something went wrong",
                errStatus: false,
                data: ''
            }, req, res, next);
            
        }
    },
}