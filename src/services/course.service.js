const { Op } = require("sequelize");
const { CourseDTO } = require("../dto/course.dto");
const db = require("../models");

/**
 * Service to create, update, and retrieve course information.
 * @module services/course
 */
const courseService = {
  /**
   * Search for courses based on the provided search terms.
   * @memberof module:services/course
   * @param {*} terms
   * @returns {Promise<CourseDTO>}
   * @throws {Error} - If the operation fails or encounters an error.
   */
  search: async (terms) => {
    console.log("Search terms", terms);
    const { rows, count } = await db.Course.findAndCountAll({
      where: {
        name: {
          [Op.like]: `%${terms}%`,
        },
      },
      distinct: true,
    });
    return {
      courses: rows.map((course) => new CourseDTO(course)),
      count,
    };
  },

  /**
   * Retrieve a paginated list of course.
   * @memberof module:services/course
   * @param {number} offset - The number of items to skip before starting to return results.
   * @param {number} limit - The maximum number of items to return.
   * @returns {Promise<CourseDTO>}
   * @throws {Error} - If the operation fails or encounters an error.
   */
  getAll: async (offset, limit) => {
    const { rows, count } = await db.Course.findAndCountAll({
      distinct: true,
      offset,
      limit,
      include: [
        db.Training,
        {
          model: db.Teacher,
          // attributes: ["UserId"],
          include: [
            {
              model: db.User,
              attributes: ["firstName", "lastName"],
            },
          ],
        },
        {
          association: "dates",
          include: [
            {
              model: db.Teacher,
              // attributes: ["UserId"],
              include: [
                { model: db.User, attributes: ["firstName", "lastName"] },
              ],
            },
          ],
        },
      ],
    });
    return {
      courses: rows.map((course) => new CourseDTO(course)),
      count,
    };
  },

  /**
   *
   * @memberof module:services/course
   * @param {*} id
   * @returns {Promise<CourseDTO>}
   * @throws {Error} - If the operation fails or encounters an error.
   */
  getById: async (id) => {
    const course = await db.Course.findByPk(id, {
      include: [
        db.Training,
        {
          model: db.Teacher,
          include: [
            {
              model: db.User,
              attributes: ["firstName", "lastName"],
            },
          ],
        },
        {
          association: "dates",
          include: [
            {
              model: db.Teacher,
              // attributes: ["UserId"],
              include: [
                { model: db.User, attributes: ["firstName", "lastName"] },
              ],
            },
          ],
        },
      ],
    });
    return course ? new CourseDTO(course) : null;
  },

  /**
   *
   * @memberof module:services/course
   * @param {*} courseToAdd
   * @returns {Promise<CourseDTO>}
   * @throws {Error} - If the operation fails or encounters an error.
   */
  create: async (courseToAdd) => {
    console.log("Service Create course: ", courseToAdd);
    const course = await db.Course.create(courseToAdd);
    await course.setTraining(courseToAdd.Training.id);
    await course.setTeacher(courseToAdd.Teacher.id);

    console.log("Service course created", course);

    // console.log(await course.countDates());
    const newCourse = await db.Course.findByPk(course.id, {
      include: [
        db.Training,
        {
          model: db.Teacher,
          include: [
            {
              model: db.User,
              attributes: ["firstName", "lastName"],
            },
          ],
        },
        {
          association: "dates",
          include: [
            {
              model: db.Teacher,
              // attributes: ["UserId"],
              include: [
                {
                  model: db.User,
                  attributes: ["firstName", "lastName"],
                },
              ],
            },
          ],
        },
      ],
    });
    console.log("create course find: ", newCourse);
    return newCourse ? new CourseDTO(newCourse) : null;
  },

  /**
   *
   * @memberof module:services/course
   * @param {*} id - The ID of the course to update
   * @param {*} courseDTO - The detail of the course to update
   * @returns {Promise<boolean>}
   * @throws {Error} - If the operation fails or encounters an error.
   */
  update: async (id, courseDTO) => {
    const transaction = await db.sequelize.transaction();
    console.log("ID: ", id);
    console.log("DTO: ", courseDTO);

    const course = await db.Course.findByPk(id, {
      include: [
        // {
        //   association: db.CourseDate,
        //   as: "dates",
        // },
      ],
    });

    console.log("TO UPDATE: ", course);

    try {
      for (const date of courseDTO.dates) {
        await course.createDate(
          {
            TeacherId: date.TeacherId,
            CourseId: date.CourseId,
            date: date.date,
          },
          { transaction }
        );
      }

      const updatedRow = await db.Course.update(
        course,
        {
          where: { id },
        },
        {
          include: [
            { association: "dates", model: db.CourseDate, as: "dates" },
          ],
        }
      );
      await transaction.commit();
      return updatedRow[0] === 1;
    } catch (err) {
      await transaction.rollback();
      return null;
    }
  },

  /**
   * Delete course with the provided ID.
   * @memberof module:services/course
   * @param {*} courseId - The ID of the course to delete.
   * @returns {Promise<boolean>}
   * @throws {Error} - If the operation fails or encounters an error.
   */
  delete: async (courseId) => {
    const nbDeletedRow = await db.Course.destroy({
      where: { id: courseId },
    });
    return nbDeletedRow === 1;
  },

  /**
   * Returns an array of dates on which a course is scheduled.
   * @memberof module:services/course
   * @param {string} courseId - The ID of the course to retrieve the schedule for.
   * @returns {Promise<any>}
   * @throws {Error} - If the operation fails or encounters an error.
   */
  getDates: async (courseId) => {
    const course = await db.Course.findByPk(courseId, {
      include: [{ association: "dates", as: "dates" }],
    });
    console.log(course);
    return course.dates;
  },

  /**
   * Retrieve a list of material for a course.
   * @memberof module:services/course
   * @param {*} courseId
   * @returns {Promise<CourseDTO>}
   * @throws {Error} - If the operation fails or encounters an error.
   */
  getMaterials: async (courseId) => {
    const course = await db.Course.findByPk(courseId, {
      include: [db.CourseMaterial],
    });
    console.log(course);
    return course.dates;
  },
};

module.exports = courseService;
