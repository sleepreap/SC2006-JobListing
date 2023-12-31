const express = require("express");
const router = express.Router();
// const jobs = require("../controllers/jobs");
const {
  createJobListing,
  getJobListing,
  getJobListings,
  deleteJobListing,
  updateJobListing,
} = require("../controllers/jobController");

//Get all job listings
router.get("/", getJobListings);

//Get single job listing
router.get("/:id", getJobListing);

// //Post a new Job listing
router.post("/", createJobListing);

//Delete a job listing
router.delete("/:id", deleteJobListing);

//update a job listing
router.patch("/:id", updateJobListing);

module.exports = router;
