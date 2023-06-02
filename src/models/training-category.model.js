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
        type: DataTypes.TEXT("long"),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      cover: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: {
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
