const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema(
  {
    resourceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resources",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    resourceData: {
      type: Object,
      required: true,
    },
    isBookmarked: {
      type: Boolean,
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

module.exports = mongoose.model("Bookmark", bookmarkSchema);
