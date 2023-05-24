const { CourseDateStudentDTO } = require("./course-date.dto");
const { TrainingDTO } = require("./training.dto");

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

class StudentDTO {
  constructor({ id, identification, User, Trainings, CourseAttendances }) {
    this.id = id;
    this.identification = identification;
    this.firstName = User.firstName;
    this.lastName = User.lastName;
    this.email = User.email;
    this.avatar = User.avatar;
    //
    console.log("StudentDTO Trainings : ", Trainings);
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

module.exports = { StudentDTO };
