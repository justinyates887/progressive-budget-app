const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const trackSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  }
);

const track = mongoose.model("track", trackSchema);

module.exports = track;