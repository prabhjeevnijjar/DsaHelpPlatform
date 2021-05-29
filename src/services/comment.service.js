const Comment = require("../database/model/comments.model");

async function createComment(data, res) {
  const newComment = await new Comment(data);
  await newComment.save().then((newData) => {
    res.status(201).json({ success: 1, message: "Published new comment" });
  });
}
async function getCommentByResId(resId, res) {
  return await Comment.find({ resourceId: resId });
}

module.exports = {
  createComment,
  getCommentByResId,
};
