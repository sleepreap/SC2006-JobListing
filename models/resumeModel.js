const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const resumeSchema = new Schema(
  {
    filename: {
      type: String,
      required: true,
    },

    employername: {
      type: String,
      required: true,
    },
  },

  { timestamps: true },
  { collection: "ResumeDetails" }
);

module.exports = mongoose.model("Resume", resumeSchema);
