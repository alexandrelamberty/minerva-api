const { CourseDateDTO } = require("../dto/course-date.dto");
const { OrderDTO } = require("../dto/order.dto");
const db = require("../models");
/**
 * Service to create, update, and retrieve course dates information, including
 * date, course, trainer, students, attendances.
 *
 * @module services/course-date
 */
const courseDateService = {
  /**
   * Search for course-dates based on the provided search terms.
   * @memberof module:services/course-date
   * @param {number} offset - The number of items to skip before starting to return results.
   * @param {number} limit - The maximum number of items to return.
   * @returns {Promise<CourseDateDTO[]>} A promise that resolves to an array of CourseDateDTO objects matching the search terms.
   * @throws {Error} - If the operation fails or encounters an error.
   */
  search: async (terms) => {
    // TODO: implementation
  },

  /**
   * Retrieve a paginated list of course-date.
   * @memberof module:services/course
   * @param {number} offset - The number of items to skip before starting to return results.
   * @param {number} limit - The maximum number of items to return.
   * @returns {Promise<{ dates: Array<CourseDateDTO>, count: number }>} - A promise that resolves to an object containing an array of CourseDateDTO objects representing the retrieved course-date and the total count of course-dates.
   * @throws {Error} - If the operation fails or encounters an error.
   */
  getAll: async (offset, limit) => {
    const { rows, count } = await db.CourseDate.findAndCountAll({
      distinct: true,
      offset,
      limit,
      include: [
        {
          model: db.Course,
        },
        {
          model: db.Teacher,
        },
        {
          model: db.MM_CourseDate_Student,
          include: [db.Student],
        },
      ],
    });
    return {
      courseDates: rows.map((courseDate) => new CourseDateDTO(courseDate)),
      count,
    };
  },

  /**
   * Retrieve course-date details with the provided ID.
   * @memberof module:services/course-date
   * @param {*} id - The ID of the course-date to retrieve.
   * @returns {Promise<CourseDateDTO|null>} A promise that resolves to a CourseDateDTO instance representing the retrieved course, or null if the course is not found.
   * @throws {Error} - If the operation fails or encounters an error.
   */
  getById: async (id) => {
    const order = await db.CourseDate.findByPk(id, {
      include: [
        {
          model: db.Teacher,
        },
        {
          model: db.MM_CourseDate_Student,
          include: [db.Course, db.Student],
        },
      ],
    });
    return order ? new OrderDTO(order) : null;
  },

  /**
   * Create course-date with the provided data.
   * @memberof module:services/course-date
   * @param {*} courseDateToAdd - The course-date data to be added.
   * @returns {Promise<CourseDateDTO|null>} A promise that resolves to a new CourseDateDTO instance representing the created course-date, or null if creation fails.
   * @throws {Error} - If the operation fails or encounters an error.
   */
  create: async (courseDateToAdd) => {
    const transaction = await db.sequelize.transaction();
    try {
      let courseDate = await db.CourseDate.create({ CourseId: courseId });

      // Add the books and quantity to the order
      for (const student of courseDateToAdd.students) {
        await courseDate.addStudent(student.id, {
          through: { attendance: student.attendance },
          transaction,
        });
      }
      await transaction.commit();

      const addedCourseDate = await db.CourseDate.findByPk(order.id, {
        include: [
          db.Course,
          {
            model: db.MM_CourseDate_Student,
            include: [db.Student],
          },
        ],
      });

      return addedCourseDate ? new CourseDateDTO(addedCourseDate) : null;
    } catch (err) {
      console.log(err);
      await transaction.rollback();
      return null;
    }
  },

  /**
   * Update course-date with the provided data.
   * @memberof module:services/course-date
   * @param {*} id - The ID of the course-date to update.
   * @param {*} updateCourseDate - The updated data for the course-date.
   * @returns {Promise<boolean>} - A promise that resolves to true if the course-date was successfully updated, or false otherwise.
   * @throws {Error} - If the operation fails or encounters an error.
   */
  update: async (id, updateCourseDate) => {
    const transaction = await db.sequelize.transaction();

    try {
      let courseDate = await db.CourseDate.findByPk(id, {
        include: [db.Student],
      });
      courseDate.setStudents([]);

      for (const student of updateCourseDate.students) {
        await courseDate.addStudent(student.id, {
          through: { attendance: student.attendance },
          transaction,
        });
      }

      await transaction.commit();
      return true;
    } catch (err) {
      console.log(err);
      await transaction.rollback();
      return null;
    }
  },

  /**
   * Deletes course-date with the provided ID.
   * @memberof module:services/course-date
   * @param {*} id - The ID of the course-date to delete.
   * @returns {Promise<boolean>} - A promise that resolves to true if the course-date was successfully deleted, or false otherwise.
   * @throws {Error} - If the operation fails or encounters an error.
   */
  delete: async (id) => {
    const nbDeletedRow = await db.CourseDate.destroy({
      where: { id },
    });

    return nbDeletedRow === 1;
  },
};

module.exports = courseDateService;
