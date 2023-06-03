"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("course", [
      /**
       * Courses in Project Management Fundamentals (Project Management)
       */
      {
        name: "Introduction to Project Management Fundamentals",
        description:
          "This course provides a comprehensive introduction to the fundamental concepts and principles of project management, covering key topics such as project lifecycle, scope management, and project stakeholders.",
        trainingId: 1,
      },
      {
        name: "Mastering Project Management Fundamentals",
        description:
          "Learn the essential skills and techniques for successful project management in this comprehensive fundamentals course. Develop a solid understanding of project planning, scheduling, and risk management.",
        trainingId: 1,
      },
      {
        name: "Project Management Fundamentals: Principles and Best Practices",
        description:
          "Gain a solid foundation in project management with this comprehensive course covering key methodologies and best practices. Learn how to effectively initiate, plan, execute, and close projects.",
        trainingId: 1,
      },
      {
        name: "Practical Project Management Fundamentals",
        description:
          "This course is designed to equip participants with the necessary knowledge and skills to effectively apply project management principles in real-world scenarios. Learn how to manage project resources, monitor progress, and handle project risks.",
        trainingId: 1,
      },
      {
        name: "Hands-On Project Management Fundamentals Workshop",
        description:
          "Explore the core principles and techniques of project management in this interactive workshop. Engage in hands-on activities to develop your project planning, communication, and problem-solving skills.",
        trainingId: 1,
      },
      /**
       * Courses in Agile Project Management (Project Management)
       */
      {
        name: "Agile Project Management Essentials",
        description:
          "This course provides a comprehensive introduction to Agile project management, covering key methodologies such as Scrum, Kanban, and Lean. Learn how to embrace flexibility and adaptability in managing projects.",
        trainingId: 2,
      },
      {
        name: "Scrum Master Certification",
        description:
          "Become a certified Scrum Master in this intensive course. Gain a deep understanding of Scrum framework, roles, and ceremonies, and learn how to effectively lead Agile projects.",
        trainingId: 2,
      },
      {
        name: "Kanban Fundamentals",
        description:
          "Master the principles of Kanban in this hands-on course. Learn how to visualize workflow, optimize processes, and improve team productivity using Kanban techniques.",
        trainingId: 2,
      },
      {
        name: "Lean Project Management",
        description:
          "Learn how to apply Lean principles and practices to project management. Streamline processes, eliminate waste, and continuously improve project delivery in this Lean-focused course.",
        trainingId: 2,
      },
      {
        name: "Agile Project Planning and Estimation",
        description:
          "Discover techniques for agile project planning and estimation in this practical course. Learn how to create user stories, prioritize requirements, and develop reliable project timelines.",
        trainingId: 2,
      },
      /**
       * Courses in Project Risk Management (Project Management)
       */
      {
        name: "Introduction to Project Risk Management",
        description:
          "This course provides an introduction to project risk management, covering key concepts such as risk identification, assessment, and mitigation strategies. Learn how to effectively manage risks throughout the project lifecycle.",
        trainingId: 3,
      },
      {
        name: "Advanced Techniques in Project Risk Management",
        description:
          "Deepen your understanding of project risk management with this advanced course. Explore quantitative risk analysis, decision-making under uncertainty, and techniques for managing complex risks.",
        trainingId: 3,
      },
      {
        name: "Risk Assessment and Mitigation Strategies",
        description:
          "Learn practical approaches to assess project risks and develop effective mitigation strategies. Explore risk response planning, risk monitoring, and contingency planning in this comprehensive course.",
        trainingId: 3,
      },
      {
        name: "Risk Management in Agile Projects",
        description:
          "Discover how to incorporate risk management principles into Agile projects. Learn how to identify, prioritize, and respond to risks in a dynamic and iterative project environment.",
        trainingId: 3,
      },
      {
        name: "Risk Management Best Practices",
        description:
          "Explore best practices in project risk management, drawing from industry standards and real-world case studies. Learn how to establish a risk management framework and foster a proactive risk management culture.",
        trainingId: 3,
      },
      /**
       * Courses in Project Communication and Stakeholder Management (Project Management)
       */
      {
        name: "Effective Project Communication Strategies",
        description:
          "Learn how to establish and maintain effective communication channels in project management. Explore techniques for stakeholder engagement, status reporting, and conflict resolution.",
        trainingId: 4,
      },
      {
        name: "Stakeholder Analysis and Engagement",
        description:
          "Gain a deep understanding of stakeholder analysis and engagement in project management. Learn how to identify, prioritize, and manage project stakeholders to ensure project success.",
        trainingId: 4,
      },
      {
        name: "Negotiation and Influencing Skills for Project Managers",
        description:
          "Enhance your negotiation and influencing skills in project management. Learn strategies for effective communication, building rapport, and reaching mutually beneficial agreements.",
        trainingId: 4,
      },
      {
        name: "Managing Project Teams and Collaboration",
        description:
          "Explore techniques for managing project teams and fostering collaboration. Learn how to build high-performing teams, resolve conflicts, and facilitate effective team communication.",
        trainingId: 4,
      },
      {
        name: "Project Communication in a Virtual Environment",
        description:
          "Discover how to effectively communicate and engage stakeholders in a virtual project environment. Learn best practices for virtual meetings, remote collaboration, and overcoming communication barriers.",
        trainingId: 4,
      },

      /**
       * Courses in Project Quality Management (Project Management)
       */
      {
        name: "Introduction to Project Quality Management",
        description:
          "This course provides an introduction to project quality management, covering key concepts such as quality planning, assurance, and control. Learn how to ensure project deliverables meet or exceed stakeholder expectations.",
        trainingId: 5,
      },
      {
        name: "Quality Metrics and Performance Measurement",
        description:
          "Explore techniques for measuring project quality and performance. Learn how to define and track quality metrics, analyze performance data, and implement continuous improvement strategies.",
        trainingId: 5,
      },
      {
        name: "Quality Assurance and Process Improvement",
        description:
          "Discover how to establish effective quality assurance processes and drive process improvement initiatives. Learn how to identify quality gaps, implement corrective actions, and foster a culture of quality.",
        trainingId: 5,
      },
      {
        name: "Quality Management in Agile Projects",
        description:
          "Learn how to integrate quality management principles into Agile projects. Explore Agile testing techniques, quality standards, and approaches to ensure continuous delivery of high-quality products.",
        trainingId: 5,
      },
      {
        name: "Managing Supplier Quality and Vendor Relationships",
        description:
          "Develop strategies for managing supplier quality and vendor relationships in projects. Learn how to evaluate vendor performance, establish quality requirements, and ensure effective collaboration with suppliers.",
        trainingId: 5,
      },

      /**
       * Courses in Project Leadership and Team Management (Project Management)
       */
      {
        name: "Effective Project Leadership",
        description:
          "Develop essential leadership skills for project managers. Learn how to inspire and motivate teams, make strategic decisions, and effectively communicate and collaborate with stakeholders.",
        trainingId: 6,
      },
      {
        name: "Building High-Performing Project Teams",
        description:
          "Learn strategies for building and leading high-performing project teams. Explore team dynamics, conflict resolution, and techniques for fostering collaboration and innovation.",
        trainingId: 6,
      },
      {
        name: "Emotional Intelligence for Project Managers",
        description:
          "Enhance your emotional intelligence to improve project leadership. Learn how to navigate challenging situations, build relationships, and manage emotions for effective team management.",
        trainingId: 6,
      },
      {
        name: "Crisis Management in Projects",
        description:
          "Develop skills to effectively manage and navigate project crises. Learn crisis response strategies, communication techniques, and methods for minimizing the impact on project outcomes.",
        trainingId: 6,
      },
      {
        name: "Conflict Resolution and Negotiation in Project Management",
        description:
          "Explore techniques for resolving conflicts and negotiating agreements in project management. Learn strategies for effective communication, problem-solving, and reaching win-win outcomes.",
        trainingId: 6,
      },
      /**
       * Courses in Project Procurement and Contract Management (Project Management)
       */

      /**
       * Courses in Project Monitoring and Control (Project Management)
       */

      /**
       * Courses in Project Closure and Lessons Learned (Project Management)
       */

      /**
       * Courses in Digital Marketing
       */

      /**
       * Courses in Digital Marketing Fundamentals
       */

      /**
       * Course in Full Stack Web Development (Programming & Web Development)
       */

      /**
       * Course in Front-End Web Development (Programming & Web Development)
       */

      /**
       * Course in Back-End Web Development (Programming & Web Development)
       */

      /**
       * Course in Mobile App Development (Programming & Web Development)
       */

      /**
       * Course in DevOps (Programming & Web Development)
       */

      /**
       * Course in Data Science and Analytics (Programming & Web Development)
       */

      /**
       * Course in Cloud Computing (Programming & Web Development)
       */

      /**
       * Course in Agile and Scrum (Programming & Web Development)
       */

      /**
       * Course in UI/UX Design (Programming & Web Development)
       */

      /**
       * Course in Cybesecurity (Programming & Web Development)
       */

      /**
       * Course in JavaScript (Programming & Web Development)
       */

      /**
       * Course in TypeScript (Programming & Web Development)
       */

      /**
       * Course in Python (Programming & Web Development)
       */

      /**
       * Course in HTML/CSS (Programming & Web Development)
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
