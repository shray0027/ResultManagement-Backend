'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     return queryInterface.createTable('Students',{
      id : {
        type:Sequelize.INTEGER(11),
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
      },
      name : {
          type : Sequelize.STRING(50),
          allowNull:false
      },
      rollNo : {
          type : Sequelize.INTEGER(20),
          allowNull:false,
          unique:true
      },
      dob :{
          type : Sequelize.DATEONLY(),
          allowNull:false
      },
      score: Sequelize.INTEGER(10),
      createdAt : Sequelize.DATE,
      updatedAt : Sequelize.DATE
    });
  },
  async down (queryInterface, Sequelize) {
      return queryInterface.dropTable('Students');
  }
};


