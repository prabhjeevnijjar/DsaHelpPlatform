const RecRes = require("../database/model/recommendedresource.model");
async function createRecRes(data, res) {
  const newResource = await new RecRes(data);
  await newResource.save().then((newData) => {
    res.status(201).json({ success: 1, message: "Created" });
  });
}
async function getRecRes(res) {
  return await RecRes.find(
    {}
    //      function (err, result) {
    //     if (err) {
    //       res.status(404).json({ success: 0, "message:": "No data found" });
    //     }
    //     res.status(201).json({ success: 1, data: result });
    //   }
  );
}
module.exports = {
  createRecRes,
  getRecRes,
};
