const { Op } = require("sequelize");
const { EnrollmentDTO } = require("../dto/enrollment.dto");
const db = require("../models");

/**
 * Service to create, update, and retrieve enrollment information.
 * @module services/enrollment
 */
const enrollmentService = {
  /**
   * Search for enrollments based on the provided search terms.
   * @memberof module:services/s/enrollment
   * @param {*} terms - The search terms to match against training name.
   * @returns {Promise<EnrollmentDTO[]>} A promise that resolves to an array of Enrollment objects matching the search terms.
   * @throws {Error} - If the operation fails or encounters an error.
   */
  search: async (terms) => {
    const { rows, count } = await db.Enrollment.findAndCountAll({
      where: {
        firstName: {
          [Op.like]: `%${terms}%`,
        },
      },
      distinct: true,
    });
    return {
      enrollments: rows.map((enrollment) => new EnrollmentDTO(enrollment)),
      count,
    };
  },

  /**
   * Retrieve a list of paginated enrollment
   * @memberof module:services/s/enrollment
   * @param {number} offset - The number of items to skip before starting to return results.
   * @param {number} limit - The maximum number of items to return.
   * @returns {Promise<{ enrollments: Array<EnrollmentDTO>, count: number }>} - A promise that resolves to an object containing an array of EnrollmentDTO objects representing the enrollment and the total count of enrollments.
   * @throws {Error} - If the operation fails or encounters an error.
   */
  getAll: async (offset, limit) => {
    const { rows, count } = await db.Enrollment.findAndCountAll({
      distinct: true,
      offset,
      limit,
      include: [db.Training, db.Student],
    });
    return {
      enrollments: rows.map((enrollment) => new EnrollmentDTO(enrollment)),
      count,
    };
  },

  /**
   * Retrieve enrollment with the provided ID.
   * @memberof module:services/s/enrollment
   * @param {*} id - The ID of the enrollment to retrieve.
   * @returns {Promise<EnrollmentDTO|null>} A promise that resolves to a EnrollmentDTO instance representing the retrieved enrollment, or null if the course is not found.
   * @throws {Error} - If the operation fails or encounters an error.
   */
  getById: async (id) => {
    const enrollment = await db.Enrollment.findByPk(id, {
      include: [db.Student, db.Training],
    });
    return enrollment ? new EnrollmentDTO(enrollment) : null;
  },

  /**
   * Create enrollment with the provided data.
   * @memberof module:services/s/enrollment
   * @param {*} enrollmentToAdd - The enrollment data to be added.
   * @returns {Promise<EnrollmentDTO|null>} A promise that resolves to a new EnrollmentDTO instance representing the created enrollment, or null if creation fails.
   * @throws {Error} - If the operation fails or encounters an error.
   */
  create: async (enrollmentToAdd) => {
    const { StudentId, TrainingId } = enrollmentToAdd;
    // TODO: Check no enrollment with the same training for a student
    const enrollmentExist = await db.Enrollment.findOne({
      where: { StudentId: StudentId, TrainingId: TrainingId },
    });
    if (!enrollmentExist) {
      const enrollment = await db.Enrollment.create(enrollmentToAdd);
      console.log(enrollment);
      return enrollment ? new EnrollmentDTO(enrollment) : null;
    }
    return null;
  },

  /**
   * Update enrollment with the provided data.
   * @memberof module:services/s/enrollment
   * @param {*} id - The ID of the enrollment to update.
   * @param {*} enrollmentToUpdate - The updated data for the enrollment.
   * @returns {Promise<boolean>} - A promise that resolves to true if the enrollment was successfully updated, or false otherwise.
   * @throws {Error} - If the operation fails or encounters an error.
   */
  update: async (enrollmentToUpdate, id) => {
    const updatedRow = await db.Enrollment.update(enrollmentToUpdate, {
      where: { id },
    });
    return updatedRow[0] === 1;
  },

  /**
   * Deletes enrollment with the provided ID.
   * @memberof module:services/s/enrollment
   * @param {*} id - The ID of the enrollment to delete.
   * @returns {Promise<boolean>} - A promise that resolves to true if the enrollment was successfully deleted, or false otherwise.
   * @throws {Error} - If the operation fails or encounters an error.
   */
  delete: async (id) => {
    const nbDeletedRow = await db.Enrollment.destroy({
      where: { id },
    });
    return nbDeletedRow === 1;
  },
};

module.exports = enrollmentService;
