const { createResource, getResource } = require("../services/resource.service");
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
      console.log(data);
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
          res.status(200).json({ success: 1, data: fetchedData });
        } else {
          res
            .status(404)
            .json({ success: 0, message: "No data found", fetchedData });
        }
      })
      .catch((err) => {
        res.status(400).json({ success: 0, message: "can not fetch data" });
        console.log(err);
      });
  },
};
