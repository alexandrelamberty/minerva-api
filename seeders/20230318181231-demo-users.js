"use strict";

const bcrypt = require("bcrypt");

const hashPassword = (pwd) => {
  return bcrypt.hashSync(pwd, 10);
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("User", [
      {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        password: hashPassword("4demo@Admin"),
        role: "Admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Craig",
        lastName: "Huges",
        email: "craig.huges@example.com",
        password: hashPassword("4demo@Admin"),
        role: "Admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Tina",
        lastName: "Harper",
        email: "tina.harper@example.com",
        password: hashPassword("4demo@User"),
        role: "User",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Dora",
        lastName: "Ray",
        email: "dora.ray@example.com",
        password: hashPassword("4demo@User"),
        role: "User",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("User", null, {});
  },
};
