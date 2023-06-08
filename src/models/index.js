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
db.TrainingSession = require("./training-session.model")(sequelize);
db.Training = require("./training.model")(sequelize);
db.Category = require("./training-category.model")(sequelize);
db.Course = require("./course.model")(sequelize);
db.CourseMaterial = require("./course-material.model")(sequelize);
// TODO: Associate with  Training Session
db.CourseDate = require("./course-date.model")(sequelize);
db.CourseDateAttendance = require("./course-date-attendance.model")(sequelize);
db.Teacher = require("./teacher.model")(sequelize);
db.Student = require("./student.model")(sequelize);
db.Enrollment = require("./enrollment.model")(sequelize);
db.User = require("./user.model")(sequelize);

/**
 * Relations
 */

// Training Session

db.TrainingSession.belongsToMany(db.Student, {
  through: "MM_TrainingSession_Student",
});

db.TrainingSession.belongsToMany(db.Course, {
  through: "MM_TrainingSession_Course",
});

/**
 * Template category, training and course
 */

// Training Category
db.Category.hasMany(db.Training);

// Training
db.Training.belongsTo(db.Category);
// TODO: Move relation to training session
db.Training.belongsToMany(db.Student, { through: "MM_Student_Training" });
// TODO: Move relation to training session
db.Training.hasMany(db.Course);
db.Training.hasMany(db.Enrollment);

// Course
db.Course.belongsTo(db.Training);
db.Course.hasMany(db.CourseMaterial);

// db.Course.belongsToMany(db.Teacher, { through: "MM_Teacher_Course" });
// TODO: Move to session course
db.Course.belongsTo(db.Teacher);
db.Course.hasMany(db.CourseDate, { as: "dates" });

// Course Material
db.CourseMaterial.belongsTo(db.Course);

// Course Date
// TODO: Move to session course
db.CourseDate.belongsTo(db.Course);
db.CourseDate.belongsTo(db.Teacher);
db.CourseDate.belongsToMany(db.Student, {
  // FIXME: rename to SessionCourseAttendance ?
  through: db.CourseDateAttendance,
  foreignKey: "CourseDateId",
});

// Student
db.Student.belongsTo(db.User);
db.Student.hasMany(db.Enrollment);
db.Student.belongsToMany(db.Training, { through: "MM_Student_Training" });
db.Student.belongsToMany(db.CourseDate, {
  through: db.CourseDateAttendance,
  foreignKey: "satudentId",
});

// Enrollment
db.Enrollment.belongsTo(db.Student);
db.Enrollment.belongsTo(db.Training);

// Teacher
db.Teacher.belongsTo(db.User);
db.Teacher.hasMany(db.Course);
db.Teacher.hasMany(db.CourseDate);

// Student
db.Student.belongsTo(db.User);
// TODO: Move to session training
db.Student.belongsToMany(db.Training, { through: "MM_Student_Training" });
// TODO: Move to ? Course date need to be move to an association table of
// session training and courses
db.Student.belongsToMany(db.CourseDate, {
  through: db.CourseDateAttendance,
  foreignKey: "StudentId",
});

// User
db.User.hasOne(db.Teacher);
db.User.hasOne(db.Student);

module.exports = db;
