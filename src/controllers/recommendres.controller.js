const {
  createRecRes,
  getRecRes,
} = require("../services/recommendedres.service");
module.exports = {
  async createResource(req, res, next) {
    try {
      let data = {
        postedBy: req.user, //Get from auth middleware
        link: req.body.link,
        description: req.body.description,
      };
      await createRecRes(data, res)
        .then()
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      res.status(404).json({ message: error });
    }
  },
  async getAllResources(req, res) {
    await getRecRes(res)
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
