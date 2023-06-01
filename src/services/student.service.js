const { Op } = require("sequelize");
const { StudentDTO } = require("../dto/student.dto");
const db = require("../models");

const studentService = {
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

  getById: async (id) => {
    const student = await db.Student.findByPk(id, {
      include: [
        {
          model: db.User,
          attributes: ["firstName", "lastName", "email", "avatar"],
        },
      ],
    });
    return student ? new StudentDTO(student) : null;
  },

  update: async (studentToUpdate, id) => {
    const updatedRow = await db.Student.update(studentToUpdate, {
      where: { id },
    });
    return updatedRow[0] === 1;
  },

  delete: async (id) => {
    const nbDeletedRow = await db.Student.destroy({
      where: { id },
    });
    return nbDeletedRow === 1;
  },
};

module.exports = studentService;
