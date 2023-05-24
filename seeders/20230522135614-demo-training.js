"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("training", [
      /**
       * Project Management
       */
      {
        name: "I.T. Project Manager",
        description: "",
        cover: "",
        TrainingCategoryId: 1,
        startDate: "2022-12-20",
        endDate: "2023-05-25",
        createdAt: "2022-12-20",
        updatedAt: "2023-05-25",
      },
      /**
       * Digital Marketing
       */
      {
        name: "",
        description: "",
        cover: "",
        TrainingCategoryId: 2,
        startDate: "2022-12-20",
        endDate: "2023-05-25",
        createdAt: "2022-12-20",
        updatedAt: "2023-05-25",
      },
      /**
       * Data Science & A.I.
       */
      {
        name: "",
        description: "",
        cover: "",
        TrainingCategoryId: 3,
        startDate: "2022-12-20",
        endDate: "2023-05-25",
        createdAt: "2022-12-20",
        updatedAt: "2023-05-25",
      },
      /**
       * Databases & B.I.
       */
      {
        name: "",
        description: "",
        cover: "",
        TrainingCategoryId: 4,
        startDate: "2022-12-20",
        endDate: "2023-05-25",
        createdAt: "2022-12-20",
        updatedAt: "2023-05-25",
      },
      /**
       * Programming & Web Development
       */
      {
        name: "Full Stack Web Development",
        description:
          "A comprehensive program that covers both front-end and back-end web development technologies, including HTML, CSS, JavaScript, Python, Ruby, Node.js, and databases like MySQL or MongoDB",
        cover: "",
        TrainingCategoryId: 5,
        startDate: "2022-12-20",
        endDate: "2023-05-25",
        createdAt: "2022-12-20",
        updatedAt: "2023-05-25",
      },
      {
        name: "Front-End Web Development",
        description: "",
        cover: "",
        TrainingCategoryId: 5,
        startDate: "2022-12-20",
        endDate: "2023-05-25",
        createdAt: "2022-12-20",
        updatedAt: "2023-05-25",
      },
      {
        name: "Back-End Web Development",
        description:
          "Concentrates on server-side programming and database management, covering languages like Python, Ruby, PHP, Java, frameworks like Django, Flask, Ruby on Rails, and databases like MySQL or PostgreSQL.",
        cover: "",
        TrainingCategoryId: 5,
        startDate: "2022-12-20",
        endDate: "2023-05-25",
        createdAt: "2022-12-20",
        updatedAt: "2023-05-25",
      },
      {
        name: "Mobile App Development",
        description:
          "Training focused on building mobile applications for iOS and Android platforms, covering languages like Swift, Java, or Kotlin, and frameworks like Flutter or React Native.",
        cover: "",
        TrainingCategoryId: 5,
        startDate: "2022-12-20",
        endDate: "2023-05-25",
        createdAt: "2022-12-20",
        updatedAt: "2023-05-25",
      },
      {
        name: "DevOps",
        description:
          "A program that combines development and operations, teaching skills like version control, continuous integration, deployment, cloud computing, and containerization tools like Docker and Kubernetes.",
        cover: "",
        TrainingCategoryId: 5,
        startDate: "2022-12-20",
        endDate: "2023-05-25",
        createdAt: "2022-12-20",
        updatedAt: "2023-05-25",
      },
      {
        name: "Data Science and Analytics",
        description:
          "Training program that covers data analysis, visualization, statistical modeling, machine learning, and programming languages like Python or R, along with popular libraries like NumPy, Pandas, or TensorFlow.",
        cover: "",
        TrainingCategoryId: 5,
        startDate: "2022-12-20",
        endDate: "2023-05-25",
        createdAt: "2022-12-20",
        updatedAt: "2023-05-25",
      },
      {
        name: "Cloud Computing",
        description:
          "A program that covers cloud platforms like Amazon Web Services (AWS), Microsoft Azure, or Google Cloud, teaching how to deploy and manage applications in the cloud environment.",
        cover: "",
        TrainingCategoryId: 5,
        startDate: "2022-12-20",
        endDate: "2023-05-25",
        createdAt: "2022-12-20",
        updatedAt: "2023-05-25",
      },
      {
        name: "Agile and Scrum",
        description:
          "Training on project management methodologies like Agile and Scrum, emphasizing collaboration, iterative development, and efficient team workflows.",
        cover: "",
        TrainingCategoryId: 5,
        startDate: "2022-12-20",
        endDate: "2023-05-25",
        createdAt: "2022-12-20",
        updatedAt: "2023-05-25",
      },
      {
        name: "UX/UI Design",
        description:
          "Training in user experience (UX) and user interface (UI) design principles, including wireframing, prototyping, information architecture, usability testing, and design tools like Sketch or Adobe XD.",
        cover: "",
        TrainingCategoryId: 5,
        startDate: "2022-12-20",
        endDate: "2023-05-25",
        createdAt: "2022-12-20",
        updatedAt: "2023-05-25",
      },
      {
        name: "Cybersecurity",
        description:
          "A specialized program focused on learning about network security, ethical hacking, secure coding practices, and implementing security measures to protect web applications and systems.",
        cover: "",
        TrainingCategoryId: 5,
        startDate: "2022-12-20",
        endDate: "2023-05-25",
        createdAt: "2022-12-20",
        updatedAt: "2023-05-25",
      },
      {
        name: "JavaScript",
        description:
          "A specialized training program focused on mastering JavaScript programming language and its libraries and frameworks like React, Angular, or Vue.js.",
        cover: "",
        TrainingCategoryId: 5,
        startDate: "2022-12-20",
        endDate: "2023-05-25",
        createdAt: "2022-12-20",
        updatedAt: "2023-05-25",
      },
      {
        name: "TypeScript",
        description: "",
        cover: "",
        TrainingCategoryId: 5,
        startDate: "2022-12-20",
        endDate: "2023-05-25",
        createdAt: "2022-12-20",
        updatedAt: "2023-05-25",
      },
      {
        name: "Python",
        description:
          "A program dedicated to learning Python programming language and its applications in web development, data analysis, machine learning, and automation.",
        cover: "",
        TrainingCategoryId: 5,
        startDate: "2022-12-20",
        endDate: "2023-05-25",
        createdAt: "2022-12-20",
        updatedAt: "2023-05-25",
      },
      {
        name: "HTML/CSS",
        description:
          "This training program is designed to provide a strong foundation in HTML (Hypertext Markup Language) and CSS (Cascading Style Sheets), the core technologies for building websites.",
        cover: "",
        TrainingCategoryId: 5,
        startDate: "2022-12-20",
        endDate: "2023-05-25",
        createdAt: "2022-12-20",
        updatedAt: "2023-05-25",
      },
      /**
       * Network & System
       */
      {
        name: "Full Stack Web Development",
        description: "",
        cover: "",
        TrainingCategoryId: 6,
        startDate: "2022-12-20",
        endDate: "2023-05-25",
        createdAt: "2022-12-20",
        updatedAt: "2023-05-25",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("training", null, {});
  },
};
