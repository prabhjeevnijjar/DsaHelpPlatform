const Resource = require("../database/model/resource.model");
async function createResource(data, res) {
  const newResource = await new Resource(data);
  await newResource.save().then((newData) => {
    res.status(201).json({ success: 1, message: "Created new resource" });
  });
}
async function getResource(res) {
  return await Resource.find({});
}
module.exports = {
  createResource,
  getResource,
  //   getRecRes,
};
