const { Sequelize, ModelStatic, DataTypes } = require("sequelize");

/**
 * Course
 * @param {Sequelize} sequelize
 * @returns {ModelStatic<any>}
 */

module.exports = (sequelize) => {
  const Course = sequelize.define(
    "Course",
    {
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          len: [1, 100],
        },
      },
      description: {
        type: DataTypes.STRING(50),
        allowNull: true,
        validate: {
          notEmpty: true,
          len: [1, 50],
        },
      },
    },
    {
      tableName: "course",
      timestamps: false,
    }
  );

  return Course;
};
