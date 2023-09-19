const {
  createComment,
  getCommentByResId,
  updateCommentCount
} = require("../services/comment.service");

module.exports = {
  async postComment(req, res, next) {
    if (!req.query.resourceId || !req.user || !req.body.commentText)
    {
        res.status(404).json({ code: 400, success: false, message: "resource id or user id or comment body not found" });
      } else {
      try {
        let data = {
          userId: req.user,
          userProfileImg: req.profileimage || '',
          userName: req.username || '',
          resourceId: req.query.resourceId,
          commentText: req.body.commentText,
        };
        console.log(data);
        await createComment(data, res)
          .then((data)=>{})
          .catch((err) => {
            console.log(err);
          });

      } catch (error) {
        console.log(error);
        res.status(404).json({ code: 400, success: false, message: error });
        next(error);
      }
    }
  },
  
  async getComment(req, res) {
    let resId = await req.query.resourceId;

    await getCommentByResId(resId, res)
      .then((fetchedData) => {
        if (fetchedData) {
          res.status(200).json({  code: 200, success: true, success: 1, data: fetchedData });
        } else {
          res
            .status(404)
            .json({ success: 0, message: "No comments found", fetchedData });
        }
      })
      .catch((err) => {
        res.status(400).json({ success: 0, message: "can not fetch comments" });
        console.log(err);
      });
  },
};
