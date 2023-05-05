const { Op } = require("sequelize");
const { CategoryDTO } = require("../dto/training-category.dto");
const db = require("../models");

const trainingCategoryService = {
  search: async (terms) => {
    console.log("Search terms", terms);
    const { rows, count } = await db.Category.findAndCountAll({
      where: {
        name: {
          [Op.like]: `${terms}%`,
        },
      },
      attributes: ["name"],
      distinct: true,
    });
    return {
      categories: rows.map((category) => new CategoryDTO(category)),
      count,
    };
  },

  getAll: async (offset, limit) => {
    const { rows, count } = await db.Category.findAndCountAll({
      distinct: true,
      offset: offset,
      limit: limit,
      include: [db.Training],
    });
    console.log(rows);
    return {
      categories: rows.map((category) => new CategoryDTO(category)),
      count,
    };
  },

  getById: async (id) => {
    const category = await db.Category.findByPk(id, {
      include: [db.Training],
    });
    return category ? new CategoryDTO(category) : null;
  },

  create: async (categoryToAdd) => {
    const category = await db.Category.create(categoryToAdd);
    return category ? new CategoryDTO(category) : null;
  },

  update: async (id, categoryToUpdate) => {
    const updatedRow = await db.Category.update(categoryToUpdate, {
      where: { id },
    });
    return updatedRow[0] === 1;
  },

  delete: async (id) => {
    const nbDeletedRow = await db.Category.destroy({
      where: { id },
    });
    return nbDeletedRow === 1;
  },

  nameAlreadyExists: async (name) => {
    const category = await db.Category.findOne({ where: { name } });
    return category ? true : false;
  },
};

module.exports = trainingCategoryService;
