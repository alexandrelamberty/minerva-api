/**
 * Data Transfer Object (DTO) for representing category details.
 */
class CategoryDTO {
  /**
   * Create a new instance of CategoryDTO.
   * @param {Object} params - The parameters for initializing the DTO.
   * @param {number} params.id - The ID of the category.
   * @param {string} params.name - The name of the category.
   * @param {string} params.description - The description of the category.
   * @param {string} params.cover - The cover image URL of the category.
   * @param {Array} params.Trainings - The trainings associated with the category.
   */
  constructor({ id, name, description, cover, Trainings }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.cover = cover;
    this.trainings = Trainings ? Trainings : null;
  }
}

module.exports = { CategoryDTO };
