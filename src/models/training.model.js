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
        type: DataTypes.STRING(45),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      description: {
        type: DataTypes.STRING(500),
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
      startDate: {
        type: DataTypes.DATE(),
        allowNull: false,
      },
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
