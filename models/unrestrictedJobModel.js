const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UjobSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    location: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("UJobListing", UjobSchema);
