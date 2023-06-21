const User = require("../database/model/users.model");
const Resource = require("../database/model/resource.model");

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
        console.log("===========",req.user)
        await Resource.find({ postedBy: req.user })
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
            console.log({err})
            responseHandler({
                statusCode: 404,
                errCode: 404,
                errMsg: "User Not Found",
                errStatus: false,
                data
            }, req, res, next);
        })

    }
}