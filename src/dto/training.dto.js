const { UserDTO } = require("./user.dto");

class TrainingDTO {
  constructor({
    id,
    title,
    description,
    startDate,
    endDate,
    TrainingCategory,
    Courses,
    Users,
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.category = TrainingCategory;
    this.courses = Courses;
    this.users = Users ? Users.map((user) => new UserDTO(user)) : [];
  }
}

module.exports = { TrainingDTO };
