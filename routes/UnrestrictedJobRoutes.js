const express = require("express");
const router = express.Router();

const {
  getUJobListing,
  getUJobListings,
} = require("../controllers/uJobController");

//Get all job listings
router.get("/", getUJobListings);

//Get single job listing
router.get("/:id", getUJobListing);

module.exports = router;
