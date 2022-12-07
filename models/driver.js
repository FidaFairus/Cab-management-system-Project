const {Sequelize, DataTypes} = require('sequelize')
const db = require('./db');

const driver = db.sequelize.define('driver',{

        id: {
           type: DataTypes.INTEGER,
           primaryKey: true,
           autoIncrement: true,
     
        },
        
         Full_name :{
             type: DataTypes.STRING(50),
             allowNull: false,
         },
         Email: {
             type: DataTypes.STRING(50),
             allowNull: false,
             unique: true
         },
         Mobile_number:{
             type: DataTypes.STRING(10),
             allowNull: false,
                  
         },
         Username: {
             type: DataTypes.STRING(50),
             allowNull: false,
             unique:true
            
         },
         license: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique:true
           
        },
        vehicleno: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique:true
           
        },
        
         Password: {
             type: DataTypes.STRING(50),
             allowNull: false
            
         }
     
     });
     
module.exports = driver;
