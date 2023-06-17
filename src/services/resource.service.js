const Resource = require("../database/model/resource.model");

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

async function getResource(res) {
  return await Resource.find();
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
    const found = await Resource.find({
      $and: [{ _id: resid }, { bookmarkedBy: usrid }],
    });
    console.log({ found });
    if (found.length === 0) {
      await Resource.findOneAndUpdate( { _id: resid, }, { $push: { bookmarkedBy: usrid }, } )
        .then((dat) => {
          res.status(201).json({
            code: 201,
            status: true,
            success: true,
            message: "Added to bookmarks",
          });
        })
        .catch((err) => res.status(404).json({ code: 404, status: false, success: false, message: "Resource id not found", }) );
    } else {
      //  remove bookmark if resource is already bookmarked by the user
      await Resource.findOneAndUpdate( { _id: resid, }, { $pull: { bookmarkedBy: usrid } } )
        .then((dat) => res.status(201).json({ code: 201, status: true, success: true, message: "Removed from bookmarks", }))
        .catch((err) => res.status(404).json({ code: 404, status: false, success: false, message: "Resource id not found", }) );
    }
  }
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
};
