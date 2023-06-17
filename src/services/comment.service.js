const Comment = require("../database/model/comments.model");
const Resource = require("../database/model/resource.model");

async function createComment(data, res) {
  const newComment = await new Comment(data);
  await newComment.save().then((newData) => {
    res.status(201).json({ success: 1, message: "Published new comment" });
  });
}

async function getCommentByResId(resId, res) {
  return await Comment.find({ resourceId: resId });
}

async function updateCommentCount(resid, res) {

  if(!resid) res.status(404).json({ success: 0, message: "Can not find resourceid " });
  else {
    await Resource.findOneAndUpdate( { _id: resid, }, { $inc: { commentcount: 1, }, } )
        .then((dat) => {
          console.log(dat);
          // res.status(201).json({ success: 1, message: "Comment counnt incresed by 1", data: dat });
        })
        .catch((err) => {
          console.log(err);
          // res.status(404).json({ success: 0, message: "Can not find resource" });
        });
    
  }
}

module.exports = {
  createComment,
  getCommentByResId,
  updateCommentCount
};
