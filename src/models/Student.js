const Sequelize = require("sequelize");

module.exports = sequelize.define("Student", {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  rollNo: {
    type: Sequelize.INTEGER(20),
    allowNull: false,
    unique:true
  },
  name: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  dob: {
    type: Sequelize.DATEONLY(),
    allowNull: false,
  },
  score: Sequelize.INTEGER(10),
});
