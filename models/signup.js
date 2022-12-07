const {Sequelize, DataTypes} = require('sequelize')
const db = require('./db');

const Signup = db.sequelize.define('Signup',{

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
             unique: true       
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
     
module.exports = Signup;
