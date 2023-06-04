const { CourseMaterialDTO } = require("./course-material.dto");
const { TeacherDTO } = require("./teacher.dto");

/**
 * Data Transfer Object (DTO) for representing course details.
 */
class CourseDTO {
  /**
   * Create a new instance of CourseDTO.
   * @param {Object} params - The parameters for initializing the DTO.
   * @param {number} params.id - The ID of the course.
   * @param {string} params.name - The name of the course.
   * @param {string} params.description - The description of the course.
   * @param {Object} params.Teacher - The teacher associated with the course.
   * @param {Object} params.Training - The training associated with the course.
   * @param {Array} params.dates - An array of course dates.
   * @param {Array} params.CourseMaterials - An array of course materials.
   */
  constructor({
    id,
    name,
    description,
    cover,
    Training,
    Teacher,
    dates,
    CourseMaterials,
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.cover = cover;
    this.training = Training;
    this.teacher = Teacher ? new TeacherDTO(Teacher) : null;
    this.dates = dates
      ? dates.map((courseDate) => {
          console.log(courseDate);
          return new CourseDateDTO(courseDate);
        })
      : [];
    this.materials = CourseMaterials
      ? CourseMaterials.map((courseMaterial) => new CourseMaterialDTO(author))
      : [];
  }
}

class CourseDateDTO {
  constructor({ id, date, Teacher, MM_Course_Date_Student_Attendance }) {
    console.log(Teacher);
    this.id = id;
    this.date = date;
    this.teacher = Teacher ? Teacher : null;
    this.attendances = MM_Course_Date_Student_Attendance
      ? MM_Course_Date_Student_Attendance.map(
          (courseAttendance) => new CourseDateStudentDTO(courseAttendance)
        )
      : [];
  }
}

module.exports = { CourseDTO };
