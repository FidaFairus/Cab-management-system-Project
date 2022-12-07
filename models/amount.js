const {Sequelize, DataTypes} = require('sequelize')
const db = require('./db');

const amount = db.sequelize.define('amount',{

        amountId: {
           type: DataTypes.INTEGER,
           primaryKey: true,
           autoIncrement: true,
     
        },
         pickupPoint: {
             type: DataTypes.STRING(50),
             allowNull: false,
            
         },

         destination:{
             type: DataTypes.STRING(50),
             allowNull: false,
                   
         },
         amount: {
            type: DataTypes.INTEGER,
            allowNull: false
           
        }
     
     });
     

module.exports = amount;