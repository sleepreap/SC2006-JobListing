var Sequelize = require('sequelize');
var sequelizeTransforms = require('sequelize-transforms');

const sequelizeInstance = new Sequelize('argelDB', 'root', 'nfqn6qylfrmj', {
    host: 'localhost',
    port: '3306',
    dialect: 'mysql',
    //delete below code to enable logging
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    operatorsAliases: false
});

sequelizeInstance.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

sequelizeTransforms(sequelizeInstance);


module.exports.sequelizeInstance = sequelizeInstance;
module.exports.Sequelize = Sequelize;