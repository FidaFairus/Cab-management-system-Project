const {Sequelize, DataTypes} = require('sequelize')
const db = require('./db');

const admin = db.sequelize.define('admin',{

        id: {
           type: DataTypes.INTEGER,
           primaryKey: true,
           autoIncrement: true,
     
        },
        
         Username: {
             type: DataTypes.STRING(50),
             allowNull: false,
             unique:true
            
         },
        
         Password: {
             type: DataTypes.STRING(50),
             allowNull: false
            
         }
     
     });
     
module.exports = admin;
