const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require("multer");
app.use("/files", express.static("files"));

const cors = require("cors");
app.use(cors());

//MiddleWare
app.use(express.json());
app.use(bodyParser.json());

//login routes
const userRoutes = require("./routes/userRoutes");
app.use("/user", userRoutes);

//job routes with logins
const jobRoutes = require("./routes/jobRoutes");
app.use("/jobList", jobRoutes);

//unrestricted routes
const UJobRoutes = require("./routes/UnrestrictedJobRoutes");
app.use("/employee", UJobRoutes);

//connect to mongodb
const connection = mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connect to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

//resume portion

const Resume = require("./models/resumeModel");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});
const upload = multer({ storage: storage });

app.post("/uploadresume/upload", upload.single("file"), async (req, res) => {
  console.log(req.file);
  const fileName = req.file.filename;
  const employerName = req.body.employername;
  // console.log(fileName);
  // console.log(employerName);
  try {
    const resume = await Resume.create({
      filename: fileName,
      employername: employerName,
    });
    res.status(200).json(resume);
  } catch (error) {
    res.status(404).json({ err: error });
  }
});

app.get("/resumes", async (req, res) => {
  const resume = await Resume.find().sort({ createdAt: -1 });
  res.status(200).json(resume);
});

app.get("/resumes/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such Resume" });
  }

  const resume = await Resume.findById(id);
  if (!resume) {
    return res.status(400).json({ error: "No Such Resume" });
  }

  res.status(200).json(resume);
});
