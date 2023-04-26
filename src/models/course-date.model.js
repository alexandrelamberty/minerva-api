const { Sequelize, ModelStatic, DataTypes } = require("sequelize");

/**
 * CourseDate
 * @param {Sequelize} sequelize
 * @returns {ModelStatic<any>}
 */

module.exports = (sequelize) => {
  const CourseDate = sequelize.define(
    "CourseDate",
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
      file: {
        type: DataTypes.STRING(50),
        allowNull: true,
        validate: {
          notEmpty: true,
          len: [1, 50],
        },
      },
    },
    {
      tableName: "course_date",
      timestamps: false,
    }
  );

  return CourseDate;
};
