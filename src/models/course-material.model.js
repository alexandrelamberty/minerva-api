const { Sequelize, ModelStatic, DataTypes } = require("sequelize");

/**
 * CourseMaterial
 * @param {Sequelize} sequelize
 * @returns {ModelStatic<any>}
 */

module.exports = (sequelize) => {
  const CourseMaterial = sequelize.define(
    "CourseMaterial",
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
      tableName: "course_material",
      timestamps: false,
    }
  );

  return CourseMaterial;
};
