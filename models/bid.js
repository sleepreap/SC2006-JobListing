// models/comments.js
var myDatabase = require('../controllers/sqlDatabase');
var sequelizeInstance = myDatabase.sequelizeInstance;
var Sequelize = myDatabase.Sequelize;

const Bids = sequelizeInstance.define('Bids', {
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
    },
    imageName1: {
        type: Sequelize.STRING
    },
    imageName2: {
        type: Sequelize.STRING
    },
    imageName3: {
        type: Sequelize.STRING
    },
    highbid: {
        type: Sequelize.INTEGER
    },
    highbidname: {
        type: Sequelize.STRING
    },
    datetimer: {
        type: Sequelize.DATE
    },
    user_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    starcount:{
        type:Sequelize.DOUBLE,
        defaultValue: 0
    },
    startotal:{
        type:Sequelize.DOUBLE,
        defaultValue: 0
    },
    referredpeople: {
        type: Sequelize.STRING,
        defaultValue:""
    },
//        references: {
 //           model: 'members', // comment references first before starting due to constraint
 //           key: 'id'
  //      }
});

// force: true will drop the table if it already exists
Bids.sync({ force: true, logging: false }).then(() => {
    Bids.upsert({
        title: "GPU on Auction 1",
        desc: "GPU Auction 1",
        category: "GPU",
        imageName1: 'corsairpsu',
        imageName2: 'msimotherboardb250',
        imageName3: 'gtx580',
        highbid: 100,
        highbidname: 'D3rp',
        user_id: 1,
        starcount: 3,
        startotal: 8
    });
    Bids.upsert({
        title: "Motherboard on Auction 2",
        desc: "Motherboard Auction 2",
        category: "Motherboard",
        imageName1: 'amdgpubox',
        imageName2: 'gskillram',
        imageName3: 'rx580',
        highbid: 120,
        highbidname: 'argel',
        user_id: 1,
        starcount: 3,
        startotal: 9
    });
    Bids.upsert({
        title: "GPU on Auction 3",
        desc: "GPU Auction 3",
        category: "GPU",
        imageName1: 'fx8350',
        imageName2: 'r7260x',
        imageName3: 'hyperx16gb',
        highbid: 190,
        highbidname: 'weijun',
        user_id: 1,
        starcount: 3,
        startotal: 10
    });
    Bids.upsert({
        title: "Motherboard on Auction 4",
        desc: "Motherboard Auction 4",
        category: "Motherboard",
        imageName1: 'gskillram',
        imageName2: 'msimotherboardb250',
        imageName3: 'adata8gb',
        highbid: 210,
        highbidname: 'jiajun',
        user_id: 1,
        starcount: 3,
        startotal: 11
    });
    Bids.upsert({
        title: "GPU on Auction 5",
        desc: "GPU Auction 5",
        category: "GPU",
        imageName1: 'corsairpsu',
        imageName2: 'msimotherboardb250',
        imageName3: 'gtx580',
        highbid: 160,
        highbidname: 'weijun',
        user_id: 1,
        starcount: 3,
        startotal: 12
    });
    // Table created
    console.log("Bids table synced");

});

module.exports = sequelizeInstance.model('Bids', Bids);