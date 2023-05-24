"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("training_category", [
      {
        name: "Project Management",
        description:
          "Focuses on the principles, methodologies, and practices involved in successfully planning, executing, and controlling projects. It encompasses a range of skills and techniques that are essential for effective project delivery.",
        cover: "",
      },
      {
        name: "Digital Marketing",
        description: "",
        cover: "",
      },
      {
        name: "Data Science & A.I.",
        description: "",
        cover: "",
      },
      {
        name: "Database & B.I.",
        description: "",
        cover: "",
      },
      {
        name: "Programming & Web development",
        description: "",
        cover: "",
      },
      {
        name: "Network & System",
        description: "",
        cover: "",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("training_category", null, {});
  },
};
