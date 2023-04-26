const { CourseAttendanceDTO } = require("./course-attendance.dto");

class CourseDateDTO {
  constructor({ id, Course, MM_Course_Attendance }) {
    this.id = id;
    this.course = Course ? Course : null;
    this.courseAttendances = MM_Course_Attendance
      ? MM_Course_Attendance.map(
          (courseAttendance) => new CourseAttendanceDTO(courseAttendance)
        )
      : [];
  }
}

module.exports = { CourseDateDTO };
