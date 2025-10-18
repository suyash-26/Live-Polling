const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema(
  {
    poll: { type: mongoose.Schema.Types.ObjectId, ref: "Poll" },
    questionIndex: Number,
    optionIndex: Number,
    voterId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Vote", voteSchema);
