"use strict";

const bcrypt = require("bcrypt");

const hashPassword = (pwd) => {
  return bcrypt.hashSync(pwd, 10);
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("user", [
      /**
       * Admins
       */
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
      /**
       * Teachers
       */
      {
        firstName: "Tina",
        lastName: "Harper",
        email: "tina.harper@example.com",
        password: hashPassword("4demo@Teacher"),
        role: "Teacher",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Dora",
        lastName: "Ray",
        email: "dora.ray@example.com",
        password: hashPassword("4demo@Teacher"),
        role: "Teacher",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      /**
       * Students
       */
      {
        firstName: "Jim",
        lastName: "Aversky",
        email: "jim.aversky@example.com",
        password: hashPassword("4demo@Student"),
        role: "Student",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Daniel",
        lastName: "Tor",
        email: "daniel.tor@example.com",
        password: hashPassword("4demo@Student"),
        role: "Student",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("user", null, {});
  },
};
