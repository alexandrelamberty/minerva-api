const { Sequelize, ModelStatic, DataTypes } = require("sequelize");

/**
 * Teacher
 * @param {Sequelize} sequelize
 * @returns {ModelStatic<any>}
 */
module.exports = (sequelize) => {
  const Teacher = sequelize.define(
    "Teacher",
    {
      company: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
    },
    {
      tableName: "teacher",
      timestamps: true,
    }
  );

  return Teacher;
};
