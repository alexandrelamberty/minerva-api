const { StudentDTO } = require("./student.dto");

class TrainingDTO {
  constructor({ id, name, description, cover, startDate, endDate }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.cover = cover;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}

class TrainingDetailsDTO {
  constructor({
    id,
    name,
    description,
    cover,
    startDate,
    endDate,
    TrainingCategory,
    Courses,
    Students,
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.cover = cover;
    this.startDate = startDate;
    this.endDate = endDate;
    this.category = TrainingCategory;
    this.courses = Courses;
    this.students = Students
      ? Students.map((user) => new StudentDTO(user))
      : [];
  }
}

module.exports = { TrainingDTO, TrainingDetailsDTO };
