const UJob = require("../models/unrestrictedJobModel");
const mongoose = require("mongoose");

//get all joblistings
const getUJobListings = async (req, res) => {
  const ujob = await UJob.find().sort({ createdAt: -1 });
  res.status(200).json(ujob);
};

// get a single job listing

const getUJobListing = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such Job" });
  }

  const ujob = await UJob.findById(id);
  if (!ujob) {
    return res.status(400).json({ error: "No Such Job" });
  }

  res.status(200).json(ujob);
};

module.exports = {
  getUJobListings,
  getUJobListing,
};
