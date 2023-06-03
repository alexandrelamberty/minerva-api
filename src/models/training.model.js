const { Sequelize, ModelStatic, DataTypes } = require("sequelize");

/**
 * Training
 * @param {Sequelize} sequelize
 * @returns {ModelStatic<any>}
 */
module.exports = (sequelize) => {
  const Training = sequelize.define(
    "Training",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      cover: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: true,
        },
      },
      // TODO: remove, moved to TrainingSession model
      startDate: {
        type: DataTypes.DATE(),
        allowNull: false,
      },
      // TODO: remove, moved to TrainingSession model
      endDate: {
        type: DataTypes.DATE(),
        allowNull: false,
      },
    },
    {
      tableName: "training",
      timestamps: true,
    }
  );

  return Training;
};
