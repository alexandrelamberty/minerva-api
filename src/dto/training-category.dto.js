class TrainingCategoryDTO {
  constructor({ id, name, description, Trainings }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.trainings = Trainings ? Trainings : null;
  }
}

module.exports = { TrainingCategoryDTO };
