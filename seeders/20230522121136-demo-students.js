"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("student", [
      {
        identification: "00001",
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 5,
      },
      {
        identification: "00002",
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 6,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("student", null, {});
  },
};
