const { Sequelize, ModelStatic, DataTypes } = require("sequelize");

/**
 * Training
 * @param {Sequelize} sequelize
 * @returns {ModelStatic<any>}
 */
module.exports = (sequelize) => {
  const Enrollment = sequelize.define(
    "Enrollment",
    {
      validated: {
        type: DataTypes.BOOLEAN(),
        defaultValue: false,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(45),
        allowNull: false,
        defaultValue: "pending",
      },
    },
    {
      tableName: "enrollment",
      timestamps: true,
    }
  );

  return Enrollment;
};
