const express = require("express");
const router = express.Router();

const {
  getUJobListing,
  getUJobListings,
  deleteUJobListing,
  createUJobListing,
} = require("../controllers/uJobController");

//Get all job listings
router.get("/", getUJobListings);

//Get single job listing
router.get("/:id", getUJobListing);

//Post a new Job listing
router.post("/", createUJobListing);

//Delete a job listing
router.delete("/:id", deleteUJobListing);

module.exports = router;
