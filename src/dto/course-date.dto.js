/**
 * Data Transfer Object (DTO) for representing course dates.
 */
class CourseDateDTO {
  /**
   * Create a new instance of CourseDateDTO.
   * @param {Object} params - The parameters for initializing the DTO.
   * @param {number} params.id - The ID of the course date.
   * @param {string} params.date - The date of the course.
   * @param {Object|null} params.Teacher - The teacher associated with the course date.
   * @param {Object|null} params.Course - The course associated with the date.
   * @param {Array|null} params.MM_Course_Date_Student_Attendance - The student attendances associated with the course date.
   */
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
