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
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      description: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notNull: true,
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
