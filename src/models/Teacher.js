const Sequelize = require('sequelize');
module.exports = sequelize.define('Teacher',{
    id : {
        type:Sequelize.INTEGER(11),
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    email : {
        type : Sequelize.STRING(50),
        allowNull:false,
        unique:true
    },
    password : {
        type : Sequelize.STRING(500),
        allowNull:false
    },
    token : {
        type : Sequelize.STRING(500)
    }
});