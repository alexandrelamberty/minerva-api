const { Sequelize, ModelStatic, DataTypes } = require("sequelize");
const db = require(".");

/**
 * MM_Course_Attendance
 * @param {Sequelize} sequelize
 * @returns {ModelStatic<any>}
 */

// https://sequelize.org/docs/v6/core-concepts/assocs/#many-to-many-relationships
// https://sequelize.org/docs/v6/advanced-association-concepts/advanced-many-to-many/#the-best-of-both-worlds-the-super-many-to-many-relationship
module.exports = (sequelize) => {
  const MM_CourseDate_Student = sequelize.define(
    "MM_CourseDate_Student",
    {
      StudentId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Student",
          key: "id",
        },
      },
      CourseDateId: {
        type: DataTypes.INTEGER,
        references: {
          model: "CourseDate",
          key: "id",
        },
      },
      attendance: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          notNull: true,
        },
      },
    },
    {
      tableName: "MM_CourseDate_Student",
    }
  );

  return MM_CourseDate_Student;
};
