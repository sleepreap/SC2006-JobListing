// const Job = require("../models/jobModel");
// const mongoose = require("mongoose");

// //get all joblistings
// const getResumes = async (req, res) => {
//   const user_id = req.user._id;
//   const job = await Job.find({ user_id }).sort({ createdAt: -1 });
//   res.status(200).json(job);
// };

// // get a single job listing

// const getResume = async (req, res) => {
//   const { id } = req.params;
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).json({ error: "No Such Job" });
//   }

//   const job = await Job.findById(id);
//   if (!job) {
//     return res.status(400).json({ error: "No Such Job" });
//   }

//   res.status(200).json(job);
// };

// //create a new job listing
// const uploadResume = async (req, res) => {
//   const user_id = req.user._id;
//   const { title, type, location, description } = req.body;
//   try {
//     const job = await Job.create({
//       title,
//       type,
//       location,
//       description,
//       user_id,
//     });
//     res.status(200).json(job);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // delete a job listing
// const deleteResume = async (req, res) => {
//   const { id } = req.params;
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).json({ error: "No Such Job" });
//   }

//   const job = await Job.findOneAndDelete({ _id: id });
//   if (!job) {
//     return res.status(400).json({ error: "No Such Job" });
//   }

//   res.status(200).json(job);
// };

// module.exports = {
//   getResume,
//   getResumes,
//   uploadResume,
//   deleteResume,
// };
