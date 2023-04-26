const { where, Op } = require("sequelize");
const { TrainingDTO } = require("../dto/course.dto");
const { TrainingCategory, CourseMaterial, CourseDate } = require("../models");
const db = require("../models");

const trainingService = {
  search: async (terms) => {
    const { rows, count } = await db.Training.findAndCountAll({
      where: {
        title: {
          [Op.like]: `%${terms}%`,
        },
      },
      distinct: true,
      include: [TrainingCategory],
    });
    return {
      trainings: rows.map((track) => new TrainingDTO(track)),
      count,
    };
  },

  getAll: async (offset, limit, genreId) => {
    const { rows, count } = await db.Training.findAndCountAll({
      distinct: true,
      offset,
      limit,
    });
    return {
      trainings: rows.map((training) => new TrainingDTO(training)),
      count,
    };
  },

  getAllByCategoryId: async (id) => {
    const book = await db.Training.findAll(id, {
      include: [TrainingCategory],
    });
    return book ? new TrainingDTO(book) : null;
  },

  getById: async (id) => {
    const training = await db.Training.findByPk(id, {
      include: [TrainingCategory],
    });
    return training ? new TrainingDTO(training) : null;
  },

  create: async (trainingToAdd) => {
    const transaction = await db.sequelize.transaction();
    let training;
    try {
      training = await db.Training.create(trainingToAdd, { transaction });
      for (const course of trainingToAdd.courses) {
        await training.addCourse(course.id, { transaction });
      }
      await transaction.commit();

      const addedTraining = await db.Training.findByPk(training.id, {
        include: [TrainingCategory],
      });

      return addedTraining ? new TrainingDTO(addedTraining) : null;
    } catch (err) {
      await transaction.rollback();
      return null;
    }
  },

  update: async (id, trainingToUpdate) => {
    const transaction = await db.sequelize.transaction();
    console.log(trainingToUpdate);

    // Retrieve de book
    const training = await db.Training.findByPk(id, {
      include: [Genre, Publisher, Author],
    });

    try {
      // Remove the Author associations
      training.setCourses([]);
      // Update the Author associations
      for (const course of trainingToUpdate.courses) {
        await training.addCourse(course.id, { transaction });
      }
      // Update the book details
      const updatedRow = await db.Training.update(
        trainingToUpdate,
        {
          where: { id },
        },
        {
          include: [db.TrainingCategory],
        }
      );
      await transaction.commit();
      return updatedRow[0] === 1;
    } catch (err) {
      await transaction.rollback();
      return null;
    }
  },

  delete: async (id) => {
    const nbDeletedRow = await db.Training.destroy({
      where: { id },
    });
    return nbDeletedRow === 1;
  },
};

module.exports = trainingService;
