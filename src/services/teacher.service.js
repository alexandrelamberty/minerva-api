const { Op } = require("sequelize");
const { TeacherDTO } = require("../dto/teacher.dto");
const db = require("../models");

const teacherService = {
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

  getById: async (id) => {
    const teacher = await db.Teacher.findByPk(id, {
      // include:
    });
    return teacher ? new TeacherDTO(teacher) : null;
  },

  update: async (teacherToUpdate, id) => {
    const updatedRow = await db.Teacher.update(teacherToUpdate, {
      where: { id },
    });
    return updatedRow[0] === 1;
  },

  delete: async (id) => {
    const nbDeletedRow = await db.Teacher.destroy({
      where: { id },
    });
    return nbDeletedRow === 1;
  },
};

module.exports = teacherService;
