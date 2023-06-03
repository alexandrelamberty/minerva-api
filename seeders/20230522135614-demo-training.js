"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("training", [
      /**
       * Trainings in Project Management
       */
      {
        name: "Project Management Fundamentals",
        description:
          "An introductory course to the fundamentals of project management, covering project planning, scheduling, budgeting, and stakeholder management.",
        cover: "https://example.com/project_management_fundamentals.jpg",
        TrainingCategoryId: 1,
        startDate: "2022-12-20",
        endDate: "2023-05-25",
        createdAt: "2022-12-20",
        updatedAt: "2023-05-25",
      },
      {
        name: "Agile Project Management",
        description:
          "Training on applying agile principles and methodologies for managing projects, including Scrum, Kanban, and Lean practices.",
        cover: "https://example.com/agile_project_management.jpg",
        TrainingCategoryId: 1,
        startDate: "2022-11-05",
        endDate: "2023-04-10",
        createdAt: "2022-11-05",
        updatedAt: "2023-04-10",
      },
      {
        name: "Project Risk Management",
        description:
          "Training on identifying, assessing, and mitigating risks in project management to ensure project success and minimize negative impacts.",
        cover: "https://example.com/project_risk_management.jpg",
        TrainingCategoryId: 1,
        startDate: "2023-01-15",
        endDate: "2023-06-20",
        createdAt: "2023-01-15",
        updatedAt: "2023-06-20",
      },
      {
        name: "Project Communication and Stakeholder Management",
        description:
          "Training on effective project communication strategies and stakeholder management techniques to ensure clear communication and project alignment.",
        cover: "https://example.com/project_communication.jpg",
        TrainingCategoryId: 1,
        startDate: "2023-02-01",
        endDate: "2023-07-05",
        createdAt: "2023-02-01",
        updatedAt: "2023-07-05",
      },
      {
        name: "Project Quality Management",
        description:
          "Training on implementing quality management processes and techniques to ensure project deliverables meet the required standards and customer expectations.",
        cover: "https://example.com/project_quality_management.jpg",
        TrainingCategoryId: 1,
        startDate: "2023-03-10",
        endDate: "2023-08-15",
        createdAt: "2023-03-10",
        updatedAt: "2023-08-15",
      },
      {
        name: "Project Leadership and Team Management",
        description:
          "Training on effective project leadership and team management skills, including motivation, conflict resolution, and team building.",
        cover: "https://example.com/project_leadership.jpg",
        TrainingCategoryId: 1,
        startDate: "2023-04-20",
        endDate: "2023-09-25",
        createdAt: "2023-04-20",
        updatedAt: "2023-09-25",
      },
      {
        name: "Project Procurement and Contract Management",
        description:
          "Training on managing project procurement processes, vendor selection, and contract management to ensure successful project execution.",
        cover: "https://example.com/project_procurement.jpg",
        TrainingCategoryId: 1,
        startDate: "2023-05-05",
        endDate: "2023-10-10",
        createdAt: "2023-05-05",
        updatedAt: "2023-10-10",
      },
      {
        name: "Project Monitoring and Control",
        description:
          "Training on monitoring and controlling project progress, tracking project performance, and implementing corrective actions.",
        cover: "https://example.com/project_monitoring.jpg",
        TrainingCategoryId: 1,
        startDate: "2023-06-10",
        endDate: "2023-11-15",
        createdAt: "2023-06-10",
        updatedAt: "2023-11-15",
      },
      {
        name: "Project Closure and Lessons Learned",
        description:
          "Training on the project closure phase, including conducting lessons learned sessions, project evaluation, and knowledge transfer.",
        cover: "https://example.com/project_closure.jpg",
        TrainingCategoryId: 1,
        startDate: "2023-07-01",
        endDate: "2023-12-05",
        createdAt: "2023-07-01",
        updatedAt: "2023-12-05",
      },
      /**
       * Trainings in Digital Marketing
       */
      {
        name: "Digital Marketing Fundamentals",
        description:
          "A comprehensive introduction to the key concepts, strategies, and channels in digital marketing.",
        cover: "https://example.com/digital_marketing_fundamentals.jpg",
        TrainingCategoryId: 2,
        startDate: "2022-12-20",
        endDate: "2023-05-25",
        createdAt: "2022-12-20",
        updatedAt: "2023-05-25",
      },
      {
        name: "Search Engine Optimization (SEO)",
        description:
          "Training on optimizing websites and content to improve organic search engine rankings and drive targeted traffic.",
        cover: "https://example.com/seo_training.jpg",
        TrainingCategoryId: 2,
        startDate: "2022-11-05",
        endDate: "2023-04-10",
        createdAt: "2022-11-05",
        updatedAt: "2023-04-10",
      },
      {
        name: "Pay-Per-Click (PPC) Advertising",
        description:
          "Training on creating and managing effective paid advertising campaigns on platforms like Google Ads, Bing Ads, and social media networks.",
        cover: "https://example.com/ppc_advertising.jpg",
        TrainingCategoryId: 2,
        startDate: "2023-01-15",
        endDate: "2023-06-20",
        createdAt: "2023-01-15",
        updatedAt: "2023-06-20",
      },
      {
        name: "Social Media Marketing",
        description:
          "Training on leveraging social media platforms such as Facebook, Instagram, Twitter, LinkedIn, and Pinterest to engage with audiences and promote brands.",
        cover: "https://example.com/social_media_marketing.jpg",
        TrainingCategoryId: 2,
        startDate: "2023-02-01",
        endDate: "2023-07-05",
        createdAt: "2023-02-01",
        updatedAt: "2023-07-05",
      },
      {
        name: "Email Marketing",
        description:
          "Training on building and managing email marketing campaigns, including creating compelling content, optimizing email deliverability, and measuring campaign success.",
        cover: "https://example.com/email_marketing.jpg",
        TrainingCategoryId: 2,
        startDate: "2023-03-10",
        endDate: "2023-08-15",
        createdAt: "2023-03-10",
        updatedAt: "2023-08-15",
      },
      {
        name: "Content Marketing",
        description:
          "Training on creating valuable and engaging content to attract, educate, and convert customers, including strategies for blogging, video marketing, and influencer collaborations.",
        cover: "https://example.com/content_marketing.jpg",
        TrainingCategoryId: 2,
        startDate: "2023-04-20",
        endDate: "2023-09-25",
        createdAt: "2023-04-20",
        updatedAt: "2023-09-25",
      },
      {
        name: "Web Analytics",
        description:
          "Training on using tools like Google Analytics to measure website traffic, track user behavior, and analyze marketing campaign performance.",
        cover: "https://example.com/web_analytics.jpg",
        TrainingCategoryId: 2,
        startDate: "2023-05-05",
        endDate: "2023-10-10",
        createdAt: "2023-05-05",
        updatedAt: "2023-10-10",
      },
      {
        name: "Conversion Rate Optimization (CRO)",
        description:
          "Training on optimizing websites and landing pages to maximize conversions and improve user experience, including A/B testing and user interface design.",
        cover: "https://example.com/cro_training.jpg",
        TrainingCategoryId: 2,
        startDate: "2023-06-10",
        endDate: "2023-11-15",
        createdAt: "2023-06-10",
        updatedAt: "2023-11-15",
      },
      {
        name: "Mobile Marketing",
        description:
          "Training on reaching and engaging mobile users through strategies like mobile advertising, responsive web design, and mobile app marketing.",
        cover: "https://example.com/mobile_marketing.jpg",
        TrainingCategoryId: 2,
        startDate: "2023-07-01",
        endDate: "2023-12-05",
        createdAt: "2023-07-01",
        updatedAt: "2023-12-05",
      },
      {
        name: "E-commerce Marketing",
        description:
          "Training on driving traffic, optimizing conversions, and maximizing sales in online retail environments, including strategies for product listings, pricing, and customer retention.",
        cover: "https://example.com/ecommerce_marketing.jpg",
        TrainingCategoryId: 2,
        startDate: "2023-08-15",
        endDate: "2024-01-20",
        createdAt: "2023-08-15",
        updatedAt: "2024-01-20",
      },
      {
        name: "Marketing Automation",
        description:
          "Training on using software platforms like HubSpot, Marketo, or Mailchimp to automate marketing processes, nurture leads, and personalize customer interactions.",
        cover: "https://example.com/marketing_automation.jpg",
        TrainingCategoryId: 2,
        startDate: "2023-09-10",
        endDate: "2024-02-15",
        createdAt: "2023-09-10",
        updatedAt: "2024-02-15",
      },
      {
        name: "Affiliate Marketing",
        description:
          "Training on creating and managing affiliate programs to drive sales and expand brand reach through partnerships with third-party publishers.",
        cover: "https://example.com/affiliate_marketing.jpg",
        TrainingCategoryId: 2,
        startDate: "2023-10-05",
        endDate: "2024-03-10",
        createdAt: "2023-10-05",
        updatedAt: "2024-03-10",
      },
      {
        name: "Video Marketing",
        description:
          "Training on creating and promoting video content across platforms like YouTube, Vimeo, and social media, including video production, editing, and optimization.",
        cover: "https://example.com/video_marketing.jpg",
        TrainingCategoryId: 2,
        startDate: "2023-11-15",
        endDate: "2024-04-20",
        createdAt: "2023-11-15",
        updatedAt: "2024-04-20",
      },
      {
        name: "Online Reputation Management (ORM)",
        description:
          "Training on monitoring and managing online reviews, feedback, and brand mentions to maintain a positive brand image.",
        cover: "https://example.com/orm_training.jpg",
        TrainingCategoryId: 2,
        startDate: "2023-12-01",
        endDate: "2024-05-05",
        createdAt: "2023-12-01",
        updatedAt: "2024-05-05",
      },
      {
        name: "Growth Hacking",
        description:
          "Training on innovative and unconventional marketing strategies to rapidly grow a business, acquire customers, and drive user engagement.",
        cover: "https://example.com/growth_hacking.jpg",
        TrainingCategoryId: 2,
        startDate: "2024-01-10",
        endDate: "2024-06-15",
        createdAt: "2024-01-10",
        updatedAt: "2024-06-15",
      },
      /**
       * Trainings in Data Science & A.I.
       */
      {
        name: "Introduction to Data Science",
        description:
          "An introductory course to the fundamentals of data science, including data manipulation, visualization, and basic machine learning algorithms.",
        cover: "https://example.com/intro_to_data_science.jpg",
        TrainingCategoryId: 3,
        startDate: "2022-12-20",
        endDate: "2023-05-25",
        createdAt: "2022-12-20",
        updatedAt: "2023-05-25",
      },
      {
        name: "Machine Learning Foundations",
        description:
          "A comprehensive course on the foundations of machine learning, covering algorithms, model evaluation, and implementation in Python.",
        cover: "https://example.com/machine_learning_foundations.jpg",
        TrainingCategoryId: 3,
        startDate: "2022-11-05",
        endDate: "2023-04-10",
        createdAt: "2022-11-05",
        updatedAt: "2023-04-10",
      },
      {
        name: "Deep Learning",
        description:
          "Training on deep learning techniques and neural networks, including convolutional neural networks (CNNs), recurrent neural networks (RNNs), and generative adversarial networks (GANs).",
        cover: "https://example.com/deep_learning.jpg",
        TrainingCategoryId: 3,
        startDate: "2023-01-15",
        endDate: "2023-06-20",
        createdAt: "2023-01-15",
        updatedAt: "2023-06-20",
      },
      {
        name: "Natural Language Processing (NLP)",
        description:
          "Training on processing and analyzing human language data, including techniques for text classification, sentiment analysis, and language generation.",
        cover: "https://example.com/natural_language_processing.jpg",
        TrainingCategoryId: 3,
        startDate: "2023-02-01",
        endDate: "2023-07-05",
        createdAt: "2023-02-01",
        updatedAt: "2023-07-05",
      },
      {
        name: "Data Visualization",
        description:
          "Training on creating effective and compelling visual representations of data using tools like Matplotlib, Seaborn, and Tableau.",
        cover: "https://example.com/data_visualization.jpg",
        TrainingCategoryId: 3,
        startDate: "2023-03-10",
        endDate: "2023-08-15",
        createdAt: "2023-03-10",
        updatedAt: "2023-08-15",
      },
      {
        name: "Big Data Analytics",
        description:
          "Training on processing and analyzing large volumes of data using distributed computing frameworks like Apache Hadoop and Apache Spark.",
        cover: "https://example.com/big_data_analytics.jpg",
        TrainingCategoryId: 3,
        startDate: "2023-04-20",
        endDate: "2023-09-25",
        createdAt: "2023-04-20",
        updatedAt: "2023-09-25",
      },
      {
        name: "Computer Vision",
        description:
          "Training on computer vision techniques for image and video analysis, including object detection, image segmentation, and image recognition.",
        cover: "https://example.com/computer_vision.jpg",
        TrainingCategoryId: 3,
        startDate: "2023-05-05",
        endDate: "2023-10-10",
        createdAt: "2023-05-05",
        updatedAt: "2023-10-10",
      },
      {
        name: "Reinforcement Learning",
        description:
          "Training on reinforcement learning algorithms and techniques for training agents to make sequential decisions in dynamic environments.",
        cover: "https://example.com/reinforcement_learning.jpg",
        TrainingCategoryId: 3,
        startDate: "2023-06-10",
        endDate: "2023-11-15",
        createdAt: "2023-06-10",
        updatedAt: "2023-11-15",
      },
      {
        name: "Time Series Analysis",
        description:
          "Training on analyzing and forecasting time series data, including techniques like ARIMA, LSTM, and Prophet.",
        cover: "https://example.com/time_series_analysis.jpg",
        TrainingCategoryId: 3,
        startDate: "2023-07-01",
        endDate: "2023-12-05",
        createdAt: "2023-07-01",
        updatedAt: "2023-12-05",
      },
      {
        name: "Data Engineering",
        description:
          "Training on building and managing scalable data infrastructure and pipelines for data processing, storage, and retrieval.",
        cover: "https://example.com/data_engineering.jpg",
        TrainingCategoryId: 3,
        startDate: "2023-08-15",
        endDate: "2024-01-20",
        createdAt: "2023-08-15",
        updatedAt: "2024-01-20",
      },
      {
        name: "AI Ethics and Responsible AI",
        description:
          "Training on ethical considerations and responsible practices in the development and deployment of artificial intelligence systems.",
        cover: "https://example.com/ai_ethics.jpg",
        TrainingCategoryId: 3,
        startDate: "2023-09-10",
        endDate: "2024-02-15",
        createdAt: "2023-09-10",
        updatedAt: "2024-02-15",
      },
      /**
       * Trainings in Databases & B.I.
       */
      {
        name: "Introduction to Databases",
        description:
          "An introductory course to the fundamentals of databases, including relational database concepts, SQL querying, and database design principles.",
        cover: "https://example.com/intro_to_databases.jpg",
        TrainingCategoryId: 4,
        startDate: "2022-12-20",
        endDate: "2023-05-25",
        createdAt: "2022-12-20",
        updatedAt: "2023-05-25",
      },
      {
        name: "Database Administration",
        description:
          "Training on managing and maintaining database systems, including tasks like installation, configuration, backup, and performance optimization.",
        cover: "https://example.com/database_administration.jpg",
        TrainingCategoryId: 4,
        startDate: "2022-11-05",
        endDate: "2023-04-10",
        createdAt: "2022-11-05",
        updatedAt: "2023-04-10",
      },
      {
        name: "Data Modeling and Design",
        description:
          "Training on designing effective database schemas and data models to ensure data integrity, efficiency, and scalability.",
        cover: "https://example.com/data_modeling_design.jpg",
        TrainingCategoryId: 4,
        startDate: "2023-01-15",
        endDate: "2023-06-20",
        createdAt: "2023-01-15",
        updatedAt: "2023-06-20",
      },
      {
        name: "Data Warehousing",
        description:
          "Training on designing and implementing data warehouses for business intelligence and reporting purposes, including concepts like ETL (Extract, Transform, Load) and dimensional modeling.",
        cover: "https://example.com/data_warehousing.jpg",
        TrainingCategoryId: 4,
        startDate: "2023-02-01",
        endDate: "2023-07-05",
        createdAt: "2023-02-01",
        updatedAt: "2023-07-05",
      },
      {
        name: "Business Intelligence Fundamentals",
        description:
          "Training on the basics of business intelligence, including data analysis, reporting, and visualization using BI tools like Tableau, Power BI, or Qlik.",
        cover: "https://example.com/business_intelligence.jpg",
        TrainingCategoryId: 4,
        startDate: "2023-03-10",
        endDate: "2023-08-15",
        createdAt: "2023-03-10",
        updatedAt: "2023-08-15",
      },
      {
        name: "Data Integration and ETL",
        description:
          "Training on integrating data from multiple sources and performing Extract, Transform, Load (ETL) processes to consolidate and transform data for analysis.",
        cover: "https://example.com/data_integration_etl.jpg",
        TrainingCategoryId: 4,
        startDate: "2023-04-20",
        endDate: "2023-09-25",
        createdAt: "2023-04-20",
        updatedAt: "2023-09-25",
      },
      {
        name: "Data Governance and Security",
        description:
          "Training on ensuring data governance and security in database systems, including privacy regulations, access control, and data protection.",
        cover: "https://example.com/data_governance_security.jpg",
        TrainingCategoryId: 4,
        startDate: "2023-05-05",
        endDate: "2023-10-10",
        createdAt: "2023-05-05",
        updatedAt: "2023-10-10",
      },
      {
        name: "Advanced SQL and Query Optimization",
        description:
          "Training on advanced SQL querying techniques and optimizing database queries for improved performance and efficiency.",
        cover: "https://example.com/advanced_sql.jpg",
        TrainingCategoryId: 4,
        startDate: "2023-06-10",
        endDate: "2023-11-15",
        createdAt: "2023-06-10",
        updatedAt: "2023-11-15",
      },
      /**
       * Trainings in Programming & Web Development
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
       * Trainings in Network & System
       */
      {
        name: "Network Fundamentals",
        description:
          "An introductory course to the fundamentals of computer networking, covering topics like network protocols, IP addressing, and network devices.",
        cover: "https://example.com/network_fundamentals.jpg",
        TrainingCategoryId: 6,
        startDate: "2022-12-20",
        endDate: "2023-05-25",
        createdAt: "2022-12-20",
        updatedAt: "2023-05-25",
      },
      {
        name: "Network Security",
        description:
          "Training on securing computer networks and preventing unauthorized access, including topics like firewalls, encryption, and intrusion detection systems.",
        cover: "https://example.com/network_security.jpg",
        TrainingCategoryId: 6,
        startDate: "2022-11-05",
        endDate: "2023-04-10",
        createdAt: "2022-11-05",
        updatedAt: "2023-04-10",
      },
      {
        name: "Network Design and Implementation",
        description:
          "Training on designing and implementing computer networks, including network topology, network infrastructure, and network management.",
        cover: "https://example.com/network_design.jpg",
        TrainingCategoryId: 6,
        startDate: "2023-01-15",
        endDate: "2023-06-20",
        createdAt: "2023-01-15",
        updatedAt: "2023-06-20",
      },
      {
        name: "Wireless Networking",
        description:
          "Training on wireless network technologies, including Wi-Fi, Bluetooth, and cellular networks, as well as wireless security considerations.",
        cover: "https://example.com/wireless_networking.jpg",
        TrainingCategoryId: 6,
        startDate: "2023-02-01",
        endDate: "2023-07-05",
        createdAt: "2023-02-01",
        updatedAt: "2023-07-05",
      },
      {
        name: "Network Troubleshooting and Optimization",
        description:
          "Training on diagnosing and troubleshooting network issues, as well as optimizing network performance for better efficiency.",
        cover: "https://example.com/network_troubleshooting.jpg",
        TrainingCategoryId: 6,
        startDate: "2023-03-10",
        endDate: "2023-08-15",
        createdAt: "2023-03-10",
        updatedAt: "2023-08-15",
      },
      {
        name: "System Administration",
        description:
          "Training on managing and maintaining computer systems, including tasks like operating system installation, configuration, and user management.",
        cover: "https://example.com/system_administration.jpg",
        TrainingCategoryId: 6,
        startDate: "2023-04-20",
        endDate: "2023-09-25",
        createdAt: "2023-04-20",
        updatedAt: "2023-09-25",
      },
      {
        name: "Cloud Computing",
        description:
          "Training on cloud computing concepts, including cloud service models, virtualization, and cloud deployment strategies.",
        cover: "https://example.com/cloud_computing.jpg",
        TrainingCategoryId: 6,
        startDate: "2023-05-05",
        endDate: "2023-10-10",
        createdAt: "2023-05-05",
        updatedAt: "2023-10-10",
      },
      {
        name: "IT Infrastructure Management",
        description:
          "Training on managing IT infrastructure components, including servers, storage systems, and network devices, for efficient IT operations.",
        cover: "https://example.com/it_infrastructure.jpg",
        TrainingCategoryId: 6,
        startDate: "2023-06-10",
        endDate: "2023-11-15",
        createdAt: "2023-06-10",
        updatedAt: "2023-11-15",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("training", null, {});
  },
};
