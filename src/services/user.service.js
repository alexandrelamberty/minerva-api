const { Op } = require("sequelize");
const { UserDTO } = require("../dto/user.dto");
const db = require("../models");

const userService = {
  search: async (terms) => {
    const { rows, count } = await db.User.findAndCountAll({
      where: {
        firstName: {
          [Op.like]: `%${terms}%`,
        },
      },
      distinct: true,
    });
    return {
      users: rows.map((user) => new UserDTO(user)),
      count,
    };
  },

  getAll: async (offset, limit) => {
    const { rows, count } = await db.User.findAndCountAll({
      distinct: true,
      offset,
      limit,
    });
    return {
      users: rows.map((user) => new UserDTO(user)),
      count,
    };
  },

  getById: async (id) => {
    const user = await db.User.findByPk(id, {
      // include:
    });
    return user ? new UserDTO(user) : null;
  },

  update: async (userToUpdate, id) => {
    const updatedRow = await db.User.update(userToUpdate, {
      where: { id },
    });
    return updatedRow[0] === 1;
  },

  delete: async (id) => {
    const nbDeletedRow = await db.User.destroy({
      where: { id },
    });
    return nbDeletedRow === 1;
  },
};

module.exports = userService;
