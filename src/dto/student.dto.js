const { CourseDateDTO } = require("./course-date.dto");
const { TrainingDTO } = require("./training.dto");

class StudentDTO {
  constructor({
    id,
    firstName,
    lastName,
    username,
    email,
    identification,
    Trainings,
    CourseAttendances,
  }) {
    console.log("Student dto: ");
    this.id = id;
    this.identification = identification;
    this.trainings = Trainings
      ? Trainings.map((training) => new TrainingDTO(training))
      : [];
    this.attendances = CourseAttendances
      ? CourseAttendances.map((attendances) => new CourseDateDTO(attendances))
      : [];
  }
}

module.exports = { StudentDTO };
