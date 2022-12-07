const {Sequelize, DataTypes} = require('sequelize')
const db = require('./db');

const booking = db.sequelize.define('booking',{

        bookingId: {
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
         date: {
            type: DataTypes.DATEONLY,
            allowNull: false
           
        },

         time: {
             type: DataTypes.TIME,
             allowNull: false
            
         },
         userId:{
            type: DataTypes.INTEGER(50),
            allowNull: false,
            
        },
     
     });
     
module.exports = booking;
