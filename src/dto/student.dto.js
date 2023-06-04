const { CourseDateStudentDTO } = require("./course-date.dto");

/**
 * Data Transfer Object (DTO) for representing student details.
 */
class StudentDTO {
  /**
   * Create a new instance of StudentDTO.
   * @param {Object} params - The parameters for initializing the DTO.
   * @param {number} params.id - The ID of the student.
   * @param {string} params.identification - The identification of the student.
   * @param {Object} params.User - The user details of the student.
   * @param {Array} params.Trainings - The trainings associated with the student.
   * @param {Array} params.CourseAttendances - The course attendances of the student.
   */
  constructor({ id, identification, User, Trainings, CourseAttendances }) {
    this.id = id;
    this.identification = identification;
    this.firstName = User.firstName;
    this.lastName = User.lastName;
    this.email = User.email;
    this.avatar = User.avatar;
    this.trainings = Trainings
      ? Trainings.map((training) => {
          console.log(training);
          return new StudentTrainingDTO(training);
          return { id: training.id, name: training.name };
        })
      : [];
    this.attendances = CourseAttendances
      ? CourseAttendances.map(
          (attendances) => new CourseDateStudentDTO(attendances)
        )
      : [];
  }
}

class StudentTrainingDTO {
  constructor({ id, name, description, cover, startDate, endDate }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.cover = cover;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}

module.exports = { StudentDTO };
