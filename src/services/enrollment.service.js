const { Op } = require("sequelize");
const { EnrollmentDTO } = require("../dto/enrollment.dto");
const db = require("../models");

const enrollmentService = {
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

  getById: async (id) => {
    const enrollment = await db.Enrollment.findByPk(id, {
      // include:
    });
    return enrollment ? new EnrollmentDTO(enrollment) : null;
  },

  create: async (enrollmentToAdd) => {
    console.log(enrollmentToAdd);
    const enrollment = await db.Enrollment.create(enrollmentToAdd);
    console.log(enrollment);
    return enrollment ? new EnrollmentDTO(enrollment) : null;
  },

  update: async (enrollmentToUpdate, id) => {
    const updatedRow = await db.Enrollment.update(enrollmentToUpdate, {
      where: { id },
    });
    return updatedRow[0] === 1;
  },

  delete: async (id) => {
    const nbDeletedRow = await db.Enrollment.destroy({
      where: { id },
    });
    return nbDeletedRow === 1;
  },
};

module.exports = enrollmentService;
