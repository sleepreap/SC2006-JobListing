// models/comments.js
var myDatabase = require('../controllers/sqlDatabase');
var sequelizeInstance = myDatabase.sequelizeInstance;
var Sequelize = myDatabase.Sequelize;

const Jobs = sequelizeInstance.define('Jobs', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    created: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        trim: true
    },
    desc: {
        type: Sequelize.STRING,
        defaultValue: '',
        trim: true
    },
    category: {
        type: Sequelize.STRING,
        defaultValue: '',
        trim: true
    }
});

// force: true will drop the table if it already exists
Jobs.sync({ force: true, logging: false }).then(() => {
    Jobs.upsert({
        title: "Accountant",
        desc: "As a senior accountant..",
        category: "Office"
    });
    Jobs.upsert({
        title: "Engineer",
        desc: "As a senior engineer..",
        category: "Industrial"
    });
    Jobs.upsert({
        title: "Doctor",
        desc: "As a doctor..",
        category: "Hospital"
    });
    Jobs.upsert({
        title: "Retail salesman",
        desc: "As a retail salesman..",
        category: "Shopping mall"
    });
    Jobs.upsert({
        title: "Quant trader",
        desc: "As a quant trader..",
        category: "Office"
    });
    // Table created
    console.log("Jobs table synced");

});

module.exports = sequelizeInstance.model('Jobs', Jobs);