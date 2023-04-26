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
  const MM_Course_Attendance = sequelize.define(
    "MM_Course_Attendance",
    {
      UserId: {
        type: DataTypes.INTEGER,
        references: {
          model: "User",
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
      presence: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          notNull: true,
        },
      },
    },
    {
      tableName: "course_attendance",
    }
  );

  return MM_Course_Attendance;
};
