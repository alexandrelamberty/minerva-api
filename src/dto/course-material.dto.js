/**
 * Data Transfer Object (DTO) for representing course materials.
 */
class CourseMaterialDTO {
  /**
   * Create a new instance of CourseMaterialDTO.
   * @param {Object} params - The parameters for initializing the DTO.
   * @param {number} params.id - The ID of the course material.
   * @param {string} params.name - The name of the course material.
   * @param {string} params.file - The file associated with the course material.
   * @param {Object|null} params.Course - The course associated with the material.
   */
  constructor({ id, name, file, Course }) {
    this.id = id;
    this.name = name;
    this.file = file;
    this.course = Course ? Course : null;
  }
}

module.exports = { CourseMaterialDTO };
