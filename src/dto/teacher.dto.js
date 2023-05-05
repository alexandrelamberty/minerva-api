const { CourseAttendanceDTO } = require("./course-attendance.dto");
const { TrainingDTO } = require("./training.dto");

class TeacherDTO extends UserDTO {
  constructor({ id, identification, Courses, CourseAttendances }) {
    console.log("Teacher dto: ", Orders);
    this.id = id;
    this.firstName = firstName;
    this.courses = Courses
      ? Courses.map((course) => new CourseDTO(course))
      : [];
    // Courses via trainings ?
    this.attendances = CourseAttendances
      ? CourseAttendances.map(
          (attendances) => new CourseAttendanceDTO(attendances)
        )
      : [];
  }
}

module.exports = { TeacherDTO };
