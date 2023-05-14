const { Sequelize } = require("sequelize");

const { DB_SERVER, DB_DATABASE, DB_USERNAME, DB_PASSWORD } = process.env;

const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  logging: console.log,
  host: DB_SERVER,
  dialect: "mysql",
});

const db = {};
db.sequelize = sequelize;

// Models

db.Training = require("./training.model")(sequelize);
db.Category = require("./training-category.model")(sequelize);
db.Course = require("./course.model")(sequelize);
db.CourseMaterial = require("./course-material.model")(sequelize);
db.CourseDate = require("./course-date.model")(sequelize);
db.CourseDateAttendance = require("./course-date-attendance.model")(sequelize);
db.Teacher = require("./teacher.model")(sequelize);
db.Student = require("./student.model")(sequelize);
db.User = require("./user.model")(sequelize);

// Relations

// Training
db.Training.belongsTo(db.Category);
db.Training.belongsToMany(db.Student, { through: "MM_Student_Training" });
db.Training.hasMany(db.Course);

// Training Category
db.Category.hasMany(db.Training);

// Course
db.Course.belongsTo(db.Training);
db.Course.belongsToMany(db.Teacher, { through: "MM_Teacher_Course" });
db.Course.hasMany(db.CourseMaterial);
db.Course.hasMany(db.CourseDate, { as: "dates" });

// Course Material
db.CourseMaterial.belongsTo(db.Course);

// Course Date
db.CourseDate.belongsTo(db.Course);
db.CourseDate.belongsToMany(db.Student, {
  through: db.CourseDateAttendance,
  foreignKey: "CourseDateId",
});
db.CourseDate.belongsTo(db.Teacher);

// Student
db.Student.belongsToMany(db.Training, { through: "MM_Student_Training" });
db.Student.belongsToMany(db.CourseDate, {
  through: db.CourseDateAttendance,
  foreignKey: "StudentId",
});
db.Student.belongsTo(db.User);

// Teacher
db.Teacher.belongsToMany(db.Course, { through: "MM_Teacher_Course" });
db.Teacher.hasMany(db.CourseDate);
db.Teacher.belongsTo(db.User);

// User
db.User.hasOne(db.Teacher);
db.User.hasOne(db.Student);

module.exports = db;
