const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");

//MiddleWare
app.use(express.json());
app.use(bodyParser.json());

//login routes
const userRoutes = require("./routes/userRoutes");
app.use("/user", userRoutes);

//employer routes
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
let gfs;

// Create new mongo connection
const conn = mongoose.createConnection(process.env.MONGO_URI);
conn.once("open", () => {
  //init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "upload",
  });
});

// Create storage engine
const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = file.originalname;
      const fileInfo = {
        filename: filename,
        bucketName: "uploads",
        //bucketName same as collection name
      };
      resolve(fileInfo);
    });
  },
});
const upload = multer({ storage });

//resume routes

//upload resume, "file" is the same name as what is the name in the input file form
app.post("/uploadresume/upload", upload.single("file"), (req, res) => {
  //res.json({ file: req.file });
  res.redirect("/");
});

//get all resumes in json
app.get("/files", async (req, res) => {
  try {
    const files = await gfs.files.find().toArray();
    res.json(files);
  } catch (error) {
    res.status(404).json({ err });
  }
});

//get specific resume in json
app.get("/files/:filename", async (req, res) => {
  const filename = req.params.filename;
  const file = await gfs.files.findOne({ filename });
  if (!file) {
    return res.status(404).json({ error: "File not found" });
  }
  //console.log(file);
  res.json(file);
});

// //display specific resume
// app.get("/files/display/:filename", async (req, res) => {
//   const filename = req.params.filename;
//   const file = await gfs.files.findOne({ filename });
//   if (!file) {
//     return res.status(404).json({ error: "File not found" });
//   }
//   console.log(file);
//   console.log(file.filename);
//   const readstream = gfs.createReadStream({
//     filename: file.filename,
//   });
//   readstream.pipe(res);
// });
