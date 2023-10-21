const express = require("express");
const router = express.Router();

const {
  getResume,
  getResumes,
  uploadResume,
  deleteResume,
} = require("../controllers/resumeController");

const requireAuth = require("../middleware/requireAuth");

//require auth for all workout routes
router.use(requireAuth);

//Get resume
router.get("/resume", getResumes);

//Get single resume
router.get("/resume/:id", getResume);

// upload new resume
router.post("/resume", uploadResume);

//Delete a resume
router.delete("/resume/:id", deleteResume);

module.exports = router;
