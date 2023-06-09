const { Sequelize, ModelStatic, DataTypes } = require("sequelize");

/**
 * User
 * @param {Sequelize} sequelize
 * @returns {ModelStatic<any>}
 */
module.exports = (sequelize) => {
  const User = sequelize.define(
    "User",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
          notNull: true,
          notEmpty: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
          notNull: true,
          notEmpty: true,
        },
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          //isAlpha : true,
          notNull: true,
          notEmpty: true,
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          //isAlpha : true,
          notNull: true,
          notEmpty: true,
        },
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: true,
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Student",
        validate: {
          notNull: true,
          notEmpty: true,
          isIn: [["Admin", "Moderator", "Teacher", "Student"]],
        },
      },
    },
    {
      tableName: "user",
    }
  );

  // https://sequelize.org/docs/v6/other-topics/hooks/
  User.beforeCreate(async (user) => {
    console.log("UserModel::beforeCreate ", user);
    // const salt = await bcrypt.genSaltSync(11, "a");
    // const hashedPassword = await argon2.hash(user.password);
    // const hashedPassword = bcrypt.hashSync(user.password, salt);
    // user.password = hashedPassword;
  });

  return User;
};
