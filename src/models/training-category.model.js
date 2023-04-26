const { Sequelize, ModelStatic, DataTypes } = require("sequelize");

/**
 * CourseCategory
 * @param {Sequelize} sequelize
 * @returns {ModelStatic<any>}
 */

module.exports = (sequelize) => {
  const TrainingCategory = sequelize.define(
    "TrainingCategory",
    {
      name: {
        type: DataTypes.STRING(45),
        allowNull: false,
        validate: {
          len: [1, 45],
          notNull: true,
          notEmpty: true,
        },
      },
      description: {
        type: DataTypes.STRING(500),
        allowNull: false,
        validate: {
          len: [1, 500],
          notNull: true,
          notEmpty: true,
        },
      },
    },
    {
      tableName: "training_category",
      timestamps: false,
    }
  );

  return TrainingCategory;
};
