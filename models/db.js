const {Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize("cabdatas", "root", "fida@8918", {
    host: "localhost",
    dialect: "mysql"
});

module.exports.sequelize = sequelize;