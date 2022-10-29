const mongoose = require("mongoose");
const {
  RESOURCE_TYPE,
  RESOURCE_SUB_TYPE,
  RESOURCE_STUDY_TYPE,
  RESOURCE_STATUS,
} = require("../../constants/index");

const resourceSchema = new mongoose.Schema(
  {
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    resourcelink: {
      type: String,
    },
    resourcetype: {
      type: String,
      enum: RESOURCE_TYPE,
    },
    resourcesubtype: [
      {
        type: String,
        enum: RESOURCE_SUB_TYPE,
      },
    ],
    resourceauthor: [
      {
        type: String,
      },
    ],
    resourcestudytype: [
      {
        type: String,
        enum: RESOURCE_STUDY_TYPE,
      },
    ],
    postedDate: {
      type: Number,
      default: Date.now,
    },
    upvotedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    downvotedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    upvotecount: {
      type: Number,
      default: 0,
    },
    downvotecount: {
      type: Number,
      default: 0,
    },
    commentcount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: RESOURCE_STATUS, //"published", "unpublished","deleted",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Resource", resourceSchema);
