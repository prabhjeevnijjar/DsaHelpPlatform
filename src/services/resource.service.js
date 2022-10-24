const Resource = require("../database/model/resource.model");
async function createResource(data, res) {
  const newResource = await new Resource(data);
  await newResource.save().then((newData) => {
    res.status(201).json({ success: 1, message: "Created new resource" });
  });
}

async function getResource(res) {
  return await Resource.findAll({});
}

async function upVote(resid, usrid, res) {
  if (!resid || !userid)
    res
      .status(404)
      .json({ success: 0, message: "Can not find resourceid or userid" });
  else {
    const found = await Resource.find({
      $and: [{ _id: resid }, { upvotedBy: usrid }],
    });
    if (found.length == 0) {
      await Resource.findOneAndUpdate(
        {
          _id: resid,
        },
        {
          $push: { upvotedBy: usrid },
          $inc: {
            upvotecount: 1,
          },
        }
      )
        .then((dat) => {
          res.status(201).json({ success: 1, message: "Upvoted", data: dat });
        })
        .catch((err) => {
          console.log(err);
          res
            .status(404)
            .json({ success: 0, message: "Can not find resource" });
        });
    } else {
      res.status(409).json({ success: 0, message: "You can upvote only once" });
    }
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
    console.log("found dataa", found.length);
    if (found.length === 0) {
      await Resource.findOneAndUpdate(
        {
          _id: resid,
        },
        {
          $push: { downvotedBy: usrid },
          $inc: {
            downvotecount: 1,
          },
        }
      )
        .then((dat) => {
          res.status(201).json({ success: 1, message: "Downvoted", data: dat });
        })
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
};
