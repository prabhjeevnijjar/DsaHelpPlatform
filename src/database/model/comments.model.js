const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    resourceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resources",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    userName: {
      type: String,
    },
    userProfileImg :{
      data: Buffer,
      contentType: String
    },
    commentText: {
      type: String,
      required: true,
    },
    postedDate: {
      type: Number,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", commentSchema);
