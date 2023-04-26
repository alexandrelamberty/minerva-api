const { CourseDateDTO } = require("./course-date.dto");
const { CourseMaterialDTO } = require("./course-material.dto");

class CourseDTO {
  constructor({
    id,
    name,
    description,
    Training,
    CourseDates,
    CourseMaterials,
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.training = Training;
    this.dates = CourseDates
      ? CourseDates.map((courseDate) => new CourseDateDTO(courseDate))
      : [];
    this.materials = CourseMaterials
      ? CourseMaterials.map((courseMaterial) => new CourseMaterialDTO(author))
      : [];
  }
}

module.exports = { BookDTO };
