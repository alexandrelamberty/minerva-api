const { CourseDateStudentDTO } = require("./course-date.dto");
const { CourseDTO } = require("./course.dto");

/**
 * Data Transfer Object (DTO) for representing teacher details.
 */
class TeacherDTO {
  /**
   * Create a new instance of TeacherDTO.
   * @param {Object} params - The parameters for initializing the DTO.
   * @param {number} params.id - The ID of the teacher.
   * @param {string} params.company - The company associated with the teacher.
   * @param {Object} params.User - The user details of the teacher.
   * @param {Array} params.Courses - The courses associated with the teacher.
   * @param {Array} params.CourseAttendances - The course attendances of the teacher.
   */
  constructor({ id, company, User, Courses, CourseAttendances }) {
    this.id = id;
    this.company = company;
    this.user = User;
    this.courses = Courses
      ? Courses.map((course) => {
          console.log(course);
          return {
            id: course.id,
            name: course.name,
          };
          // return new CourseDTO(course);
        })
      : [];
  }
}

module.exports = { TeacherDTO };
