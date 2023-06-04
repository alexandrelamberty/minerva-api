const { where, Op } = require("sequelize");
const { TrainingDTO, TrainingDetailsDTO } = require("../dto/training.dto");
const { Category, CourseMaterial, CourseDate } = require("../models");
const db = require("../models");

/**
 * Service to create, update, and retrieve training information.
 * @module services/training
 * @see {@link module:services/training}
 */
const trainingService = {
  /**
   * Search for trainings based on the provided search terms.
   * @memberof module:services/training
   * @param {*} terms - The search terms to match against training name.
   * @returns {Promise<TrainingDTO[]>} A promise that resolves to an array of Training objects matching the search terms.
   * @throws {Error} - If the operation fails or encounters an error.
   */
  search: async (terms) => {
    const { rows, count } = await db.Training.findAndCountAll({
      where: {
        name: {
          [Op.like]: `%${terms}%`,
        },
      },
      distinct: true,
      include: [Category],
    });
    return {
      trainings: rows.map((track) => new TrainingDTO(track)),
      count,
    };
  },

  /**
   * Retrieve a paginated list of trainings.
   * @memberof module:services/training
   * @param {number} offset - The number of items to skip before starting to return results.
   * @param {number} limit - The maximum number of items to return.
   * @returns {Promise<{ students: Array<TrainingDTO>, count: number }>} - A promise that resolves to an object containing an array of TrainingDTO objects representing the teachers and the total count of teachers.
   * @throws {Error} - If the operation fails or encounters an error.
   */
  getAll: async (offset, limit) => {
    const { rows, count } = await db.Training.findAndCountAll({
      distinct: true,
      offset,
      limit,
      include: [db.Category, { model: db.Student, include: [db.User] }],
    });
    console.log("ROWS---", rows);
    return {
      trainings: rows.map((training) => new TrainingDetailsDTO(training)),
      count,
    };
  },

  /**
   * Retrieves all trainings belonging to a specific category by category ID.
   * @memberof module:services/training
   * @param {*} id - The ID of the category to retrieve trainings for.
   * @returns {Promise<TrainingDTO[]|null>} - A promise that resolves to a TrainingDTO object representing the trainings if found, or null if no trainings are found.
   * @throws {Error} - If the operation fails or encounters an error.
   */
  getAllByCategoryId: async (id) => {
    const training = await db.Training.findAll(id, {
      include: [db.Category, { model: db.Student, include: [db.User] }],
    });
    return training ? new TrainingDTO(training) : null;
  },

  /**
   * Retrieve the user details with the provided ID.
   * @memberof module:services/training
   * @param {*} id  The ID of the training to retrieve.
   * @returns {Promise<TrainingTO|null>} - A promise that resolves to a TrainingDTO object representing the training if found, or null if not found.
   * @throws {Error} - If the operation fails or encounters an error.
   */
  getById: async (id) => {
    const training = await db.Training.findByPk(id, {
      include: [
        db.Category,
        db.Course,
        { model: db.Student, include: [db.User] },
      ],
    });
    return training ? new TrainingDetailsDTO(training) : null;
  },

  /**
   * Create a training with the provided data.
   * @memberof module:services/training
   * @param {*} trainingToAdd - The training data to be added.
   * @returns {Promise<TrainingDTO|null>} A promise that resolves to a new TrainingDTO instance representing the created training, or null if creation fails.
   * @throws {Error} - If the operation fails or encounters an error.
   */
  create: async (trainingToAdd) => {
    console.log(trainingToAdd);
    const training = await db.Training.create(trainingToAdd);
    console.log(training);
    return training ? new TrainingDTO(training) : null;
  },

  /**
   * Update training with the provided data.
   * @memberof module:services/training
   * @param {*} id - The ID of the training to update.
   * @param {*} trainingToUpdate - The updated data for the training.
   * @returns {Promise<boolean>} -  Promise that resolves to true if the training update was successful, or false otherwise.
   * @throws {Error} - If the operation fails or encounters an error.
   */
  update: async (id, trainingToUpdate) => {
    const transaction = await db.sequelize.transaction();
    console.log(trainingToUpdate);

    // Retrieve the training
    const training = await db.Training.findByPk(id, {
      include: [Genre, Publisher, Author],
    });

    try {
      // Remove the Courses associations
      training.setCourses([]);
      // Update the Courses associations
      for (const course of trainingToUpdate.courses) {
        await training.addCourse(course.id, { transaction });
      }
      // Update the Training details
      const updatedRow = await db.Training.update(
        trainingToUpdate,
        {
          where: { id },
        },
        {
          include: [db.Category],
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
   * Delete training with the provided ID.
   * @memberof module:services/training
   * @param {*} id - The ID of the training to delete.
   * @returns {Promise<boolean>} -  Promise that resolves to true if the training deleted was successful, or false otherwise.
   * @throws {Error} - If the operation fails or encounters an error.
   */
  delete: async (id) => {
    const nbDeletedRow = await db.Training.destroy({
      where: { id },
    });
    return nbDeletedRow === 1;
  },

  /**
   * Updates the cover image for a training with the provided ID.
   * @memberof module:services/training
   * @param {string} id - The ID of the training to update the cover image for.
   * @param {string} filename - The filename of the new cover image.
   * @returns {Promise<boolean>} - A promise that resolves to true if the cover image update was successful, or false otherwise.
   * @throws {Error} - If the operation fails or encounters an error.
   */
  updateCover: async (id, filename) => {
    const data = {
      cover: `/images/covers/${filename}`,
    };
    const updatedRow = await db.Training.update(data, {
      where: { id },
    });
    return updatedRow[0] === 1;
  },

  /**
   * Checks if a training with the provided name already exists.
   * @memberof module:services/training
   * @param {*} name - The name of the training to check for existence.
   * @returns {Promise<boolean>} - A promise that resolves to true if a training with the provided name already exists, or false otherwise.
   * @throws {Error} - If the operation fails or encounters an error.
   */
  nameAlreadyExists: async (name) => {
    const training = await db.Training.findOne({ where: { name } });
    return training ? true : false;
  },
};

module.exports = trainingService;
