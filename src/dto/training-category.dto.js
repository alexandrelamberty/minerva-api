class CategoryDTO {
  constructor({ id, name, description, cover, Trainings }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.cover = cover;
    this.trainings = Trainings ? Trainings : null;
  }
}

module.exports = { CategoryDTO };
