class CourseDateDTO {
  constructor({
    id,
    date,
    Teacher,
    Course,
    MM_Course_Date_Student_Attendance,
  }) {
    this.id = id;
    this.date = date;
    this.teacher = Teacher ? Teacher : null;
    this.course = Course ? Course : null;
    this.attendances = MM_Course_Date_Student_Attendance
      ? MM_Course_Date_Student_Attendance.map(
          (courseAttendance) => new CourseDateStudentDTO(courseAttendance)
        )
      : [];
  }
}

class CourseDateStudentDTO {
  constructor({ id, CourseDate, Student, attendance }) {
    this.courseDate = CourseDate ? CourseDate : null;
    this.student = Student ? Student : null;
    this.attendance = attendance ? attendance : null;
  }
}

module.exports = {
  CourseDateDTO,
  CourseDateStudentDTO,
};
