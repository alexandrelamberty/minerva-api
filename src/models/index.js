const { Sequelize } = require("sequelize");

const { DB_SERVER, DB_DATABASE, DB_USERNAME, DB_PASSWORD } = process.env;

const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  host: DB_SERVER,
  dialect: "mysql",
});

const db = {};
db.sequelize = sequelize;

// Models

db.Training = require("./training.model")(sequelize);
db.TrainingCategory = require("./training-category.model")(sequelize);
db.Course = require("./course.model")(sequelize);
db.CourseMaterial = require("./course-material.model")(sequelize);
db.CourseDate = require("./course-date.model")(sequelize);
db.MM_Course_Attendance = require("./mm_course_attendance.model")(sequelize);
db.User = require("./user.model")(sequelize);

// Relations

// Training
db.Training.belongsTo(db.TrainingCategory);
db.Training.belongsToMany(db.User, { through: "MM_Training_User" });
db.Training.hasMany(db.Course);
//
db.TrainingCategory.hasMany(db.Training);

// Course
db.Course.belongsTo(db.Training);
db.Course.hasMany(db.CourseMaterial);
db.Course.hasMany(db.CourseDate);
//
db.CourseMaterial.belongsTo(db.Course);
db.CourseDate.belongsTo(db.Course);
db.CourseDate.belongsToMany(
  db.User,
  { through: db.MM_Course_Attendance },
  { foreignKey: "UserId" }
);

// User
db.User.belongsToMany(db.Training, { through: "MM_Training_User" });
db.User.belongsToMany(
  db.CourseDate,
  { through: db.MM_Course_Attendance },
  { foreignKey: "CourseDateId" }
);

module.exports = db;
