var mysql = require("mysql2/promise");
var dotenv = require("dotenv");
dotenv.config();

//database
var myDatabase = require("./controllers/sqlDatabase");
var sequelizeInstance = myDatabase.sequelizeInstance;

var express = require("express");
var app = express();
var path = require("path");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// var sequelizeSessionStore = new SessionStore({
//     db: myDatabase.sequelizeInstance,
// });

var Bids = require("./models/bid");
var Jobs = require("./models/jobs");
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

// app.get('/jobList', (req,res) => {
//     res.render('jobList');
// });

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
