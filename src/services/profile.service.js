const User = require("../database/model/users.model");
const Resource = require("../database/model/resource.model");
const Comment = require("../database/model/comments.model")
const { responseHandler } = require("../helpers/responseHandler");

var ObjectId = require('mongodb').ObjectId; 

module.exports = {
    async getProfileData (req, res, next) {
        await User.find({ _id: new ObjectId(req.user) }, 'firstname lastname email profileimage role')
        .then((data) => {
            console.log("----",data)
            if(data?.length) {
                responseHandler({
                    statusCode: 200,
                    errCode: 200,
                    errMsg: "User Found",
                    errStatus: true,
                    data
                }, req, res, next);
            } else {
                responseHandler({
                    statusCode: 200,
                    errCode: 400,
                    errMsg: "User not Found",
                    errStatus: false,
                    data
                }, req, res, next);
            }
          
        })
        .catch((err) => {
            responseHandler({
                statusCode: 404,
                errCode: 404,
                errMsg: "User Not Found",
                errStatus: false,
                data
            }, req, res, next);
        })
    },
    async getMyPostsData (req, res, next) {
        const {user} = req;
        await Resource.aggregate([
            { $match : { postedBy : user } },
            { $project : { postedBy: 1, title : 1, description : 1, resourcelink: 1, resourcelink: 1, resourcetype: 1, resourcesubtype: 1, resourceauthor: 1, resourcestudytype: 1, postedDate: 1, upvotedBy: 1, downvotedBy: 1, bookmarkedBy: 1, upvotecount: 1, downvotecount: 1, commentcount: 1, status: 1 } },
            { $lookup : {
              from : 'Bookmark',
              localField : 'postedBy',
              foreignField : 'userId',
              as : 'TEST'
            } }
          ])
        .then((data) => {
            if(data?.length) {
                responseHandler({
                    statusCode: 200,
                    errCode: 200,
                    errMsg: "User Found",
                    errStatus: true,
                    data
                }, req, res, next);
            } else {
                responseHandler({
                    statusCode: 200,
                    errCode: 400,
                    errMsg: "User not Found",
                    errStatus: false,
                    data
                }, req, res, next);
            }
          
        })
        .catch((err) => {
            console.log({err})
            responseHandler({
                statusCode: 404,
                errCode: 404,
                errMsg: "User Not Found",
                errStatus: false,
                data
            }, req, res, next);
        })

    },
    async getMyCommentedData (req, res, next) {
        // TODO: call resource data here to send with this.
        const {user} = req;
        await Comment.aggregate([
            { $match : { userId : user } },
            { $project : { resourceId: 1, commentText : 1, postedDate: 1 } },
            { $lookup : {
              from : 'User',
              localField : 'userId',
              foreignField : 'userId',
              as : 'TEST'
            } }
          ])
        .then((data) => {
            if(data?.length) {
                responseHandler({
                    statusCode: 200,
                    errCode: 200,
                    errMsg: "User Found",
                    errStatus: true,
                    data
                }, req, res, next);
            } else {
                responseHandler({
                    statusCode: 200,
                    errCode: 400,
                    errMsg: "No Comments Found",
                    errStatus: false,
                    data
                }, req, res, next);
            }
          
        })
        .catch((err) => {
            console.log({err})
            responseHandler({
                statusCode: 404,
                errCode: 404,
                errMsg: "User Not Found",
                errStatus: false,
                data
            }, req, res, next);
        })

    },
    async getMyUpvoteData(req, res, next) {
        // TODO: call resource data here to send with this.
        const {user} = req;
        await Comment.aggregate([
            { $match : { userId : user } },
            { $project : { resourceId: 1, commentText : 1, postedDate: 1 } },
            { $lookup : {
              from : 'User',
              localField : 'userId',
              foreignField : 'userId',
              as : 'TEST'
            } }
          ])
        .then((data) => {
            if(data?.length) {
                responseHandler({
                    statusCode: 200,
                    errCode: 200,
                    errMsg: "User Found",
                    errStatus: true,
                    data
                }, req, res, next);
            } else {
                responseHandler({
                    statusCode: 200,
                    errCode: 400,
                    errMsg: "No Comments Found",
                    errStatus: false,
                    data
                }, req, res, next);
            }
          
        })
        .catch((err) => {
            console.log({err})
            responseHandler({
                statusCode: 404,
                errCode: 404,
                errMsg: "User Not Found",
                errStatus: false,
                data
            }, req, res, next);
        })

    },

}