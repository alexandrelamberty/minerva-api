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
   * @returns
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
   *
   * @memberof module:services/s/enrollment
   * @param {number} offset - The number of items to skip before starting to return results.
   * @param {number} limit - The maximum number of items to return.
   * @returns
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
   *
   * @memberof module:services/s/enrollment
   * @param {*} id
   * @returns
   * @throws {Error} - If the operation fails or encounters an error.
   */
  getById: async (id) => {
    const enrollment = await db.Enrollment.findByPk(id, {
      // include:
    });
    return enrollment ? new EnrollmentDTO(enrollment) : null;
  },

  /**
   *
   * @memberof module:services/s/enrollment
   * @param {*} enrollmentToAdd
   * @returns
   * @throws {Error} - If the operation fails or encounters an error.
   */
  create: async (enrollmentToAdd) => {
    console.log(enrollmentToAdd);
    const enrollment = await db.Enrollment.create(enrollmentToAdd);
    console.log(enrollment);
    return enrollment ? new EnrollmentDTO(enrollment) : null;
  },

  /**
   *
   * @memberof module:services/s/enrollment
   * @param {*} enrollmentToUpdate
   * @param {*} id
   * @returns
   * @throws {Error} - If the operation fails or encounters an error.
   */
  update: async (enrollmentToUpdate, id) => {
    const updatedRow = await db.Enrollment.update(enrollmentToUpdate, {
      where: { id },
    });
    return updatedRow[0] === 1;
  },

  /**
   *
   * @memberof module:services/s/enrollment
   * @param {*} id
   * @returns
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
