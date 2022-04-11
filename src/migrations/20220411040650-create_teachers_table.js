'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('Teachers',{
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
      },
      createdAt : Sequelize.DATE,
      updatedAt : Sequelize.DATE
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('Teachers');
  }
};
