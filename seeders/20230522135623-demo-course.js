"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("course", [
      /**
       * Project Management - I.T. Project Manager
       */
      {
        name: "HTML Fundamentals",
        description: "",

        trainingId: 1,
      },

      /**
       * Digital Marketing - I.T. Project Manager
       */
      {
        name: "HTML Fundamentals",
        description: "",

        trainingId: 2,
      },

      /**
       * Programming & Web Development - Course in HTML/CSS
       */
      {
        name: "HTML Fundamentals",
        description:
          "Understanding the structure and syntax of HTML, including tags, elements, attributes, and their usage. Topics covered may include headings, paragraphs, lists, links, images, tables, forms, and basic semantic elements.",

        trainingId: 18,
      },
      {
        name: "CSS Fundamentals",
        description:
          "Exploring the principles of CSS for styling web pages, including selectors, properties, values, inheritance, specificity, and the box model. Topics covered may include colors, typography, layout, positioning, responsiveness, and media queries.",

        trainingId: 18,
      },
      {
        name: "Responsive Web Design",
        description:
          "Learning techniques to create websites that adapt and respond to different screen sizes and devices. Participants will understand how to use CSS media queries, flexible grids, and fluid layouts to achieve responsive designs.",

        trainingId: 18,
      },
      {
        name: "CSS Frameworks",
        description:
          "Introducing popular CSS frameworks like Bootstrap or Foundation that provide pre-built components and responsive grid systems to streamline web development. Participants will learn how to leverage these frameworks to create visually appealing and responsive websites quickly.",

        trainingId: 18,
      },
      {
        name: "CSS Preprocessors",
        description:
          "Exploring CSS preprocessors such as Sass or Less, which offer advanced features like variables, mixins, nesting, and modularization. Participants will learn how to write cleaner and more maintainable CSS code using preprocessors.",

        trainingId: 18,
      },
      {
        name: "CSS Animation and Transitions",
        description:
          "Understanding how to add animations, transitions, and other visual effects to web pages using CSS. Participants will learn techniques to create smooth animations, hover effects, and interactive elements.",

        trainingId: 18,
      },
      {
        name: "Web Design Best Practices",
        description:
          "Exploring design principles, user experience considerations, and accessibility guidelines for creating well-designed and user-friendly websites. Participants will learn techniques for optimizing web performance and improving the overall user experience.",

        trainingId: 18,
      },
      {
        name: "Project Work",
        description:
          "Undertaking practical exercises and projects to apply the acquired HTML and CSS skills. Participants will work on building responsive web pages, implementing styling and layout techniques, and creating visually appealing websites.",

        trainingId: 18,
      },
      /**
       * Network & System
       */
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("course", null, {});
  },
};
