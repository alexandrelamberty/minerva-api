const { StudentDTO } = require("./student.dto");
const { UserDTO } = require("./user.dto");

class TrainingDTO {
  constructor({
    id,
    name,
    description,
    startDate,
    endDate,
    TrainingCategory,
    Courses,
    Students,
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.category = TrainingCategory;
    this.courses = Courses;
    this.students = Students
      ? Students.map((user) => new StudentDTO(user))
      : [];
  }
}

module.exports = { TrainingDTO };
