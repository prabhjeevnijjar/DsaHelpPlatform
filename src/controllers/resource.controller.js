const {
  createResource,
  getResource,
  upVote,
  downVote,
} = require("../services/resource.service");
module.exports = {
  async createResource(req, res, next) {
    try {
      let data = {
        postedBy: req.user,
        name: req.body.name, //Get from auth middleware
        resourcetype: req.body.resourcetype,
        resourcesubtype: req.body.resourcesubtype,
        resourcelink: req.body.resourcelink,
        resourceauthor: req.body.resourceauthor,
        resourcestudytype: req.body.resourcestudytype,
        postedDate: req.body.postedDate,
        status: req.body.status,
      };
      console.log("data:", data);
      await createResource(data, res)
        .then()
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: error });
      next(error);
    }
  },
  async getResources(req, res) {
    await getResource(res)
      .then((fetchedData) => {
        if (fetchedData) {
          res.status(200).json({
            code: 200,
            success: true,
            message: "Data fetched successfully !",
            data: { data: fetchedData },
            status: true,
          });
        } else {
          res.status(404).json({
            code: 404,
            success: false,
            message: "No data found",
            data: { data: [] },
            status: false,
          });
        }
      })
      .catch((err) => {
        res.status(404).json({
          code: 404,
          success: false,
          message: "Something went wrong",
          status: false,
        });
        console.log(err);
      });
  },
  async upvote(req, res) {
    try {
      resid = req.query.adId;
      usrid = req.user;
      console.log(resid, usrid);
      await upVote(resid, usrid, res);
    } catch (err) {
      res.status(404).json({ success: 0, message: "can not fetch data" });
    }
  },
  async downvote(req, res) {
    try {
      resid = req.query.adId;
      usrid = req.user;
      console.log(resid, usrid);
      await downVote(resid, usrid, res);
    } catch (err) {
      console.log(err);
      res.status(404).json({ success: 0, message: "can not fetch data" });
    }
  },
};
