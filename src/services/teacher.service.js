const { Op } = require("sequelize");
const { TeacherDTO } = require("../dto/teacher.dto");
const db = require("../models");

/**
 * Service to create, update, and retrieve teacher information.
 * @module services/teacher
 */
const teacherService = {
  /**
   * Searches for teachers based on the provided search terms.
   * @memberof module:services/teacher
   * @param {*} terms - The search terms to match against teacher first names, last names.
   * @returns {Promise<TeacherDTO[]>} A promise that resolves to an array of Teacher objects matching the search terms.
   * @throws {Error} - If the operation fails or encounters an error.
   */
  search: async (terms) => {
    const { rows, count } = await db.Teacher.findAndCountAll({
      where: {
        firstName: {
          [Op.like]: `%${terms}%`,
        },
      },
      distinct: true,
      include: [{ model: db.User, attributes: ["firstName", "lastName"] }],
    });
    return {
      teachers: rows.map((teacher) => new TeacherDTO(teacher)),
      count,
    };
  },
  /**
   * Retrieves a paginated list of teachers.
   * @memberof module:services/teacher
   * @param {number} offset - The number of items to skip before starting to return results.
   * @param {number} limit - The maximum number of items to return.
   * @returns {Promise<{ teachers: Array<TeacherDTO>, count: number }>} - A promise that resolves to an object containing an array of TeacherDTO objects representing the teachers and the total count of teachers.
   * @throws {Error} - If the retrieval operation fails or encounters an error.
   */
  getAll: async (offset, limit) => {
    const { rows, count } = await db.Teacher.findAndCountAll({
      distinct: true,
      offset,
      limit,
      include: [
        { model: db.User, attributes: ["firstName", "lastName", "email"] },
        { model: db.Course, attributes: ["name"] },
      ],
    });
    return {
      teachers: rows.map((teacher) => new TeacherDTO(teacher)),
      count,
    };
  },
  /**
   * Retrieves teacher details by their ID.
   * @memberof module:services/teacher
   * @param {*} id - The ID of the teacher to retrieve.
   * @returns {Promise<TeacherDTO|null>} - A promise that resolves to a TeacherDTO object representing the teacher if found, or null if not found.
   * @throws {Error} - If the operation fails or encounters an error.
   */
  getById: async (id) => {
    const teacher = await db.Teacher.findByPk(id, {
      include: [
        { model: db.User, attributes: ["firstName", "lastName", "email"] },
        { model: db.Course, attributes: ["name"] },
      ],
    });
    return teacher ? new TeacherDTO(teacher) : null;
  },

  /**
   * Update a teacher with the provided data.
   * @memberof module:services/teacher
   * @param {*} id - The ID of the teacher to update.
   * @param {*} teacherToUpdate - The updated data for the teacher.
   * @returns {Promise<boolean>} - A promise that resolves to true if the teacher was successfully updated, or false otherwise.
   * @throws {Error} - If the operation fails or encounters an error.
   */
  update: async (id, teacherToUpdate) => {
    const updatedRow = await db.Teacher.update(teacherToUpdate, {
      where: { id },
    });
    return updatedRow[0] === 1;
  },

  /**
   * Deletes teacher with the provided ID.
   * @memberof module:services/teacher
   * @param {*} id - The ID of the teacher to delete.
   * @returns {Promise<boolean>} - A promise that resolves to true if the teacher was successfully deleted, or false otherwise.
   * @throws {Error} - If the operation fails or encounters an error.
   */
  delete: async (id) => {
    const nbDeletedRow = await db.Teacher.destroy({
      where: { id },
    });
    return nbDeletedRow === 1;
  },
};

module.exports = teacherService;
