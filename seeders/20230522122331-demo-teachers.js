"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("teacher", [
      {
        company: "eevos",
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 3,
      },
      {
        company: "eevos",
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 4,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("teacher", null, {});
  },
};
