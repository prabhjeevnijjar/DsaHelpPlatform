const {
  createComment,
  getCommentByResId,
  updateCommentCount
} = require("../services/comment.service");

module.exports = {
  async postComment(req, res, next) {
    if (!req.query.resourceId || !req.user || !req.body.commentText)
        res .status(404).json({ success: 0, message: "resource id or user id or comment body not found" });
    else {
      try {
        let data = {
          userId: req.user,
          resourceId: req.query.resourceId,
          commentText: req.body.commentText,
        };
        console.log(data);
        await createComment(data, res)
          .then(
            await updateCommentCount(req.query.resourceId,res)
              .then()
              .catch((err)=>{
                console.log(err);
              })
          )
          .catch((err) => {
            console.log(err);
          });

      } catch (error) {
        console.log(error);
        res.status(404).json({ message: error });
        next(error);
      }
    }
  },
  
  async getComment(req, res) {
    let resId = await req.query.resourceId;

    await getCommentByResId(resId, res)
      .then((fetchedData) => {
        if (fetchedData) {
          res.status(200).json({ success: 1, data: fetchedData });
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
