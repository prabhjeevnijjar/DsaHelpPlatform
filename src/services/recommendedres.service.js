const RecRes = require("../database/model/recommendedresource.model");
async function createRecRes(data) {
  try {
    const newResource = await new RecRes(data);
    await newResource.save();
    return newResource;
  } catch (err) {
    return err;
  }
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
