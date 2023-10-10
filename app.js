var mysql = require("mysql2/promise");
var dotenv = require("dotenv");
dotenv.config();

var express = require("express");
var app = express();
var path = require("path");

const mongoose = require("mongoose");

//MiddleWare
app.use(express.json());

app.set("views", path.resolve(__dirname, "views/pages"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

var jobRoutes = require("./routes/jobRoutes");
app.use("/jobList", jobRoutes);

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
