class CourseMaterialDTO {
  constructor({ id, name, file, Course }) {
    this.id = id;
    this.name = name;
    this.file = file;
    this.course = Course ? Course : null;
  }
}

module.exports = { CourseMaterialDTO };
