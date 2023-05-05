const { Sequelize, ModelStatic, DataTypes } = require("sequelize");

/**
 * Student
 * @param {Sequelize} sequelize
 * @returns {ModelStatic<any>}
 */
module.exports = (sequelize) => {
  const Student = sequelize.define(
    "Student",
    {
      identification: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
    },
    {
      tableName: "student",
      timestamps: true,
    }
  );

  return Student;
};
