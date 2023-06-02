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
      date: {
        type: DataTypes.DATE(),
        allowNull: false,
      },
    },
    {
      tableName: "course_date",
      timestamps: false,
    }
  );

  return CourseDate;
};
