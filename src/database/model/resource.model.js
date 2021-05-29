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
    name: {
      //resource name
      type: String,
      required: true,
    },
    resourcetype: {
      type: String, //dsa,programming language, devops, CI/CD
      enum: RESOURCE_TYPE,
    },
    resourcesubtype: [
      {
        type: String,
        enum: RESOURCE_SUB_TYPE, //arrays, strings, AWS, Azure, Jenkins
      },
    ],
    resourcelink: {
      type: String, //URL
    },
    resourceauthor: [
      {
        type: String, //publisher name(s)
      },
    ],
    resourcestudytype: [
      {
        type: String,
        enum: RESOURCE_STUDY_TYPE, //text based, video based, full course(udemy/pluralsight coursera), whatsapp/telegram group
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
    // reviews: [
    //   {
    //     text: {
    //       type: String,
    //     },
    //     givenby: {
    //       type: String,
    //       ref: "Users",
    //     },
    //     // unique: true
    //   },
    // ],
    upvotecount: {
      type: Number,
      default: 0,
    },
    downvotecount: {
      type: Number,
      default: 0,
    },
    // lastedited: [
    //   {
    //     editeddate: {
    //       type: Number,
    //       default: Date.now(),
    //     },
    //     editedcomment: {
    //       type: String,
    //     },
    //   },
    // ],
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
