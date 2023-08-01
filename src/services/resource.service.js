const Resource = require("../database/model/resource.model");
const Bookmark = require("../database/model/bookmark.model");
const User = require("../database/model/users.model");
const { responseHandler } = require("../helpers/responseHandler");

var ObjectId = require('mongodb').ObjectId; 

async function createResource(data, res) {
  await new Resource(data).save().then((newData) => {
    res.status(201).json({
      code: 201,
      status: true,
      success: true,
      message: "Created new resource",
      data: { data: newData },
    });
  });
}

async function getResource(userId) {
  console.log({userId})
  if(userId) {
    // all likes, dislikes, comments, bookmarks by this user and throw into feed
    const data = await Resource.aggregate([
      { $match : { postedBy : userId } },
      { $project : { postedBy: 1, title : 1, description : 1, resourcelink: 1, resourcelink: 1, resourcetype: 1, resourcesubtype: 1, resourceauthor: 1, resourcestudytype: 1, postedDate: 1, upvotedBy: 1, downvotedBy: 1, bookmarkedBy: 1, upvotecount: 1, downvotecount: 1, commentcount: 1, status: 1 } },
      { $lookup : {
        from : 'Bookmark',
        localField : 'postedBy',
        foreignField : 'userId',
        as : 'TEST'
      } }
    ]);
    return data;
  } else {
    return await Resource.find();
  }
}

async function getBookmarkById(resid, res) {
  console.log({resid})
   await Bookmark.find({ "userId": new ObjectId(resid) })
   .then((dat) => {
    res.status(200).json({
      code: 200,
      success: true,
      message: dat?.length ? "Bookmark Data fetched successfully !" : "No data available",
      data: dat,
      status: true,
    });
  })
  .catch((err)=>{
    res.status(404).json({
      code: 404,
      success: false,
      message: "Bookmark Data not fetched !",
      data: err,
      status: false,
    });
  })
}

async function bookmarkRes(resid, usrid, res) {
  if (!resid || !usrid)
    res.status(404).json({
      code: 404,
      status: false,
      success: false,
      message: "Unauthorized access",
    });
  else {
    const found = await Resource.find({ _id: resid });

    if(found?.length) {
      // find bookmark by res id and user id
      // if exist then set isBookmark: false
      const bookmarkFound = await Bookmark.find({
        $and: [{ resourceId: resid }, { userId: usrid }],
      });

    if(!bookmarkFound?.length) { // bookmark not found then create on
      const data = {
        resourceId: resid,
        userId: usrid,
        resourceData: found,
        isBookmarked: true
      }

      await new Bookmark(data).save().then((newData) => {
        res.status(201).json({
          code: 201,
          status: true,
          success: true,
          message: "Created new bookmark",
          data: { newData },
        });
      });
    } else { // else update status to false
      Bookmark.findOneAndDelete({ $and: [{ resourceId: resid }, { userId: usrid }] })
      .then((dat)=>{
        res.status(201).json({
          code: 201,
          status: true,
          success: true,
          message: "Deleted bookmark",
        });
      })
      .catch((err)=>{
        res.status(404).json({ code: 404, status: false, success: false, message: "Bookmark not found", })
      })
    }
    }
  }
}

async function getResourceByAnId (req, res, next) {
  console.log("::::::::::::::::::",req.query.resId)
  await Resource.find({ _id: req.query.resId })
  .then((data) => {
    console.log("FOUND::::::::: ",data)
      if(data?.length > 0) {
          responseHandler({
              statusCode: 200,
              errCode: 200,
              errMsg: "Resource Found",
              errStatus: true,
              data
          }, req, res, next);
      } else {
          responseHandler({
              statusCode: 200,
              errCode: 400,
              errMsg: "Resource not Found",
              errStatus: false,
              data:[]
          }, req, res, next);
      }
    
  })
  .catch((err) => {
      responseHandler({
          statusCode: 404,
          errCode: 404,
          errMsg: "Resource Not Foundd",
          errStatus: false,
          data:[]
      }, req, res, next);
  })
}

async function upVote(resid, usrid, res) {
  if (!resid || !userid)
    res
      .status(404)
      .json({ success: 0, message: "Can not find resourceid or userid" });
  else {
    const found = await Resource.find({ $and: [{ _id: resid }, { upvotedBy: usrid }] });

    if (found.length == 0) {
      await Resource.findOneAndUpdate( { _id: resid, }, { $push: { upvotedBy: usrid }, $inc: { upvotecount: 1, }, } )
        .then((dat) => {
          res.status(201).json({ success: 1, message: "Upvoted", data: dat });
        })
        .catch((err) => {
          console.log(err);
          res
            .status(404)
            .json({ success: 0, message: "Can not find resource" });
        });
    } else res.status(409).json({ success: 0, message: "You can upvote only once" });
    
  }
}

async function downVote(resid, usrid, res) {
  if (!resid || !usrid)
    res
      .status(404)
      .json({ success: 0, message: "Can not find resourceid or userid" });
  else {
    const found = await Resource.find({
      $and: [{ _id: resid }, { downvotedBy: usrid }],
    });

    if (found.length === 0) {
      await Resource.findOneAndUpdate( { _id: resid, }, { $push: { downvotedBy: usrid }, $inc: { downvotecount: 1, }, } )
        .then((dat) => res.status(201).json({ success: 1, message: "Downvoted", data: dat }))
        .catch((err) => {
          console.log(err);
          res
            .status(404)
            .json({ success: 0, message: "Can not find resource" });
        });
    } else {
      res
        .status(409)
        .json({ success: 0, message: "You can downvote only once" });
    }
  }
}

module.exports = {
  createResource,
  getResource,
  upVote,
  downVote,
  bookmarkRes,
  getBookmarkById,
  getResourceByAnId
};
