const mongoose = require("mongoose");

const UserclaimHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    points: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const ClaimHistory = mongoose.model("ClaimHistory", UserclaimHistorySchema);
module.exports = ClaimHistory;
