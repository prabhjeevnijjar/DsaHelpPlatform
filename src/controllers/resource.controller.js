const { responseHandler } = require("../helpers/responseHandler");
const {
  createResource,
  getResource,
  upVote,
  downVote,
  bookmarkRes,
  getBookmarkById,
  getResourceByAnId
} = require("../services/resource.service");

module.exports = {
  async createResource(req, res, next) {
    try {
      let data = {
        postedBy: req.user,
        title: req.body.title,
        description: req.body.description,
        resourcelink: req.body.resourcelink,
        resourcetype: req.body.resourcetype,
        resourcesubtype: req.body.resourcesubtype,
        resourceauthor: req.body.resourceauthor,
        resourcestudytype: req.body.resourcestudytype,
        status: req.body.status,
      };
      await createResource(data, res)
        .then()
        .catch((err) => {});
    } catch (error) {
      res.status(404).json({ message: error });
      next(error);
    }
  },

  async getResources(req, res) { // get all
    await getResource(req, res)
      .then((fetchedData) => {
        if (fetchedData) {
          res.status(200).json({
            code: 200,
            success: true,
            message: "Data fetched successfully !",
            data: fetchedData,
            status: true,
          });
        } else {
          res.status(404).json({
            code: 404,
            success: false,
            message: "No data found",
            data: [],
            status: false,
          });
        }
      })
      .catch((err) => {
        console.log("==7676676767==",err)
        res.status(404).json({
          code: 404,
          success: false,
          message: "Something went wrong",
          status: false,
        });
      });
  },

  async getResourceById(req, res) {
    try {
      await getResourceByAnId(req, res)
    } catch(err) {
      responseHandler({
          statusCode: 404,
          errCode: 404,
          errMsg: "Something went wrongg",
          errStatus: false,
          data: err
    }, req, res);
   }
  },

  async bookmarkResource(req, res) {
    try {
      resid = req.query.resid;
      usrid = req.user;
  
      await bookmarkRes(resid, usrid, res);
    } catch (err) {
      res.status(404).json({
        code: 404,
        success: false,
        message: "Something went wrong",
        status: false,
      });
    }
  },

  async getBookmarks(req, res) {
      usrid = req.user;
      await getBookmarkById(usrid, res)
  },

  async upvote(req, res) {
    try {
      resid = req.query.adId;
      usrid = req.user;
      await upVote(resid, usrid, res);
    } catch (err) {
      res.status(404).json({ success: 0, message: "can not fetch data" });
    }
  },

  async downvote(req, res) {
    try {
      resid = req.query.adId;
      usrid = req.user;
      await downVote(resid, usrid, res);
    } catch (err) {
      res.status(404).json({ success: 0, message: "can not fetch data" });
    }
  },
};
