const { Op } = require("sequelize");
const { StudentDTO } = require("../dto/student.dto");
const db = require("../models");

/**
 * Service to create, update, and retrieve student information.
 * @module services/student
 */
const studentService = {
  /**
   * Search for students based on the provided search terms.
   * @memberof module:services/student
   * @param {*} terms- The search terms to match against student first names, last names.
   * @returns {Promise<StudentDTO[]>} A promise that resolves to an array of Student objects matching the search terms.
   * @throws {Error} - If the operation fails or encounters an error.
   */
  search: async (terms) => {
    const { rows, count } = await db.Student.findAndCountAll({
      where: {
        firstName: {
          [Op.like]: `%${terms}%`,
        },
      },
      distinct: true,
      include: [
        { model: db.User, attributes: ["firstName", "lastName", "email"] },
      ],
    });
    return {
      students: rows.map((student) => new StudentDTO(student)),
      count,
    };
  },

  /**
   * Retrieve a paginated list of students.
   * @memberof module:services/student
   * @param {number} offset - The number of items to skip before starting to return results.
   * @param {number} limit - The maximum number of items to return.
   * @returns {Promise<{ students: Array<StudentDTO>, count: number }>} - A promise that resolves to an object containing an array of TeacherDTO objects representing the teachers and the total count of teachers.
   * @throws {Error} - If the operation fails or encounters an error.
   */
  getAll: async (offset, limit) => {
    const { rows, count } = await db.Student.findAndCountAll({
      distinct: true,
      offset,
      limit,
      include: [
        db.CourseDate,
        {
          model: db.Training,
        },
        {
          model: db.User,
          attributes: ["firstName", "lastName", "email", "avatar"],
        },
      ],
    });
    return {
      students: rows.map((student) => new StudentDTO(student)),
      count,
    };
  },
  /**
   * Retrieve student details.
   * @memberof module:services/student
   * @param {*} studentId - The ID of the student to retrieve.
   * @returns {Promise<TeacherDTO|null>} - A promise that resolves to a StudentDTO object representing the student if found, or null if not found.
   * @throws {Error} - If the operation fails or encounters an error.
   */
  getById: async (studentId) => {
    const student = await db.Student.findByPk(studentId, {
      include: [
        {
          model: db.User,
          attributes: ["firstName", "lastName", "email", "avatar"],
        },
      ],
    });
    return student ? new StudentDTO(student) : null;
  },

  /**
   * Create student with the provided data.
   * @memberof module:services/s/student
   * @param {*} enrollmentToAdd - The enrollment data to be added.
   * @returns {Promise<StudentDTO|null>} A promise that resolves to a new StudentDTO instance representing the created student, or null if creation fails.
   * @throws {Error} - If the operation fails or encounters an error.
   */
  create: async (studentToAdd) => {
    const student = await db.Student.create(studentToAdd);
    return student ? new StudentDTO(student) : null;
  },

  /**
   * Update student with the provided ID.
   * @param {*} studentId - The ID of the student to update.
   * @param {*} studentToUpdate - The updated data for the student.
   * @returns {Promise<boolean>} - A promise that resolves once the student has been successfully updated.
   * @throws {Error} - If the operation fails or encounters an error.
   */
  update: async (studentId, studentToUpdate) => {
    const updatedRow = await db.Student.update(studentToUpdate, {
      where: { id: studentId },
    });
    return updatedRow[0] === 1;
  },

  /**
   * Delete student with the provided ID.
   * @memberof module:services/student
   * @param {*} studentId - The ID of the student to delete.
   * @returns {Promise<boolean>} - A promise that resolves once the student has been successfully deleted.
   * @throws {Error} - If the operation fails or encounters an error.
   */
  delete: async (studentId) => {
    const nbDeletedRow = await db.Student.destroy({
      where: { id: studentId },
    });
    return nbDeletedRow === 1;
  },
};

module.exports = studentService;
