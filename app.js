const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();

const mongoose = require("mongoose");

//MiddleWare
app.use(express.json());

//login routes
const userRoutes = require("./routes/userRoutes");
app.use("/user", userRoutes);

//employer routes
const jobRoutes = require("./routes/jobRoutes");
app.use("/jobList", jobRoutes);

//unrestricted routes
const UJobRoutes = require("./routes/UnrestrictedJobRoutes");
app.use("/employee", UJobRoutes);

// // Resume routes
// const resumeRoutes = require("./routes/resumeRoutes");
// app.use("/jobList", resumeRoutes);

//connect to mongodb
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connect to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
