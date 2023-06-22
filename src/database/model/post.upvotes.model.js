const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
    resourceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resources"
    },
    upvotedB
})

module.exports = mongoose.model("Resource", resourceSchema);
