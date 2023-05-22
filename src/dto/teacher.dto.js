const { CourseDateStudentDTO } = require("./course-date.dto");
const { CourseDTO } = require("./course.dto");

class TeacherDTO {
  constructor({ id, company, User, Courses, CourseAttendances }) {
    this.id = id;
    this.company = company;
    this.user = User;
    this.courses = Courses
      ? Courses.map((course) => new CourseDTO(course))
      : [];
    // Courses via trainings ?
    this.attendances = CourseAttendances
      ? CourseAttendances.map(
          (attendances) => new CourseDateStudentDTO(attendances)
        )
      : [];
  }
}

class TeacherDetailDTO {
  constructor({ id, company, User, Courses, CourseAttendances }) {
    this.id = id;
    this.company = company;
    this.user = User;
    this.courses = Courses
      ? Courses.map((course) => new CourseDTO(course))
      : [];
    // Courses via trainings ?
    this.attendances = CourseAttendances
      ? CourseAttendances.map(
          (attendances) => new CourseDateStudentDTO(attendances)
        )
      : [];
  }
}

module.exports = { TeacherDTO, TeacherDetailDTO };
