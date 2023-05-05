const { where, Op } = require("sequelize");
const { TrainingDTO } = require("../dto/training.dto");
const { Category, CourseMaterial, CourseDate } = require("../models");
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
      include: [Category],
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
      include: [Category, db.Course],
    });
    return {
      trainings: rows.map((training) => new TrainingDTO(training)),
      count,
    };
  },

  getAllByCategoryId: async (id) => {
    const training = await db.Training.findAll(id, {
      include: [Category],
    });
    return training ? new TrainingDTO(training) : null;
  },

  getById: async (id) => {
    const training = await db.Training.findByPk(id, {
      include: [Category, db.Course],
    });
    return training ? new TrainingDTO(training) : null;
  },

  create: async (trainingToAdd) => {
    console.log(trainingToAdd);
    const training = await db.Training.create(trainingToAdd);
    return training ? new TrainingDTO(training) : null;
  },

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

  delete: async (id) => {
    const nbDeletedRow = await db.Training.destroy({
      where: { id },
    });
    return nbDeletedRow === 1;
  },
};

module.exports = trainingService;
