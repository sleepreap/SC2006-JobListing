var Jobs = require("../models/jobs");
var myDatabase = require("./sqlDatabase");
var sequelize = myDatabase.sequelizeInstance;

exports.showJobs = function (req, res) {
  sequelize.query("SELECT * from Jobs ", { model: Jobs }).then((jobs) => {
    res.render("jobList", {
      title: "Job list page",
      jobs: jobs,
    });
  });
};

exports.createJobs = function (req, res) {
  var post_data = req.body;
  console.log(post_data);
  console.log("creating jobs");

  var jobData = {
    title: req.body.title,
    desc: req.body.desc,
    category: req.body.category,
  };

  Jobs.create(jobData).then((newComment, created) => {
    if (!newComment) {
      return res.send(400, {
        message: "error",
      });
    }

    res.redirect("/jobList");
  });
};
