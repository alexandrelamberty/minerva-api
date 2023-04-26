class CourseAttendanceDTO {
  constructor({ id, CourseDate, User, presence }) {
    this.courseDate = CourseDate ? CourseDate : null;
    this.user = User ? User : null;
    this.presence = presence ? presence : null;
  }
}

module.exports = { CourseAttendanceDTO };
