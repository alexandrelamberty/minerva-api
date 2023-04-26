const { CourseAttendanceDTO } = require("./course-attendance.dto");
const { TrainingDTO } = require("./training.dto");

class UserDTO {
  constructor({
    id,
    firstName,
    lastName,
    username,
    email,
    role,
    Trainings,
    CourseAttendances,
  }) {
    console.log("User dto: ", Orders);
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.email = email;
    this.role = role;
    this.trainings = Trainings
      ? Trainings.map((training) => new TrainingDTO(training))
      : [];
    // Courses via trainings ?
    this.attendances = CourseAttendances
      ? CourseAttendances.map(
          (attendances) => new CourseAttendanceDTO(attendances)
        )
      : [];
  }
}

module.exports = { UserDTO };
