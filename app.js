const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();

const mongoose = require("mongoose");

//MiddleWare
app.use(express.json());

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
