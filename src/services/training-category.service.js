const { Op } = require("sequelize");
const { CategoryDTO } = require("../dto/training-category.dto");
const db = require("../models");

/**
 * Service to create, update, and retrieve training category information.
 * @module services/category
 */
const trainingCategoryService = {
  /**
   * Search for categories based on the provided search terms.
   * @memberof module:services/category
   * @param {*} terms - The search terms to match against category name.
   * @returns
   * @throws {Error} - If the operation fails or encounters an error.
   */
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
  /**
   *
   * @memberof module:services/category
   * @param {number} offset - The number of items to skip before starting to return results.
   * @param {number} limit - The maximum number of items to return.
   * @returns
   * @throws {Error} - If the operation fails or encounters an error.
   */
  getAll: async (offset, limit) => {
    const { rows, count } = await db.Category.findAndCountAll({
      distinct: true,
      offset: offset,
      limit: limit,
      include: [
        {
          model: db.Training,
          // attributes: ["id", "name"],
        },
      ],
    });

    return {
      categories: rows.map((category) => new CategoryDTO(category)),
      count,
    };
  },
  /**
   *
   * @memberof module:services/category
   * @param {*} id
   * @returns
   * @throws {Error} - If the operation fails or encounters an error.
   */
  getById: async (id) => {
    const category = await db.Category.findByPk(id, {
      include: [db.Training],
    });
    return category ? new CategoryDTO(category) : null;
  },
  /**
   *
   * @memberof module:services/category
   * @param {*} categoryToAdd
   * @returns
   * @throws {Error} - If the operation fails or encounters an error.
   */
  create: async (categoryToAdd) => {
    const category = await db.Category.create(categoryToAdd);
    return category ? new CategoryDTO(category) : null;
  },
  /**
   *
   * @memberof module:services/category
   * @param {*} id
   * @param {*} categoryToUpdate
   * @returns
   * @throws {Error} - If the operation fails or encounters an error.
   */
  update: async (id, categoryToUpdate) => {
    const updatedRow = await db.Category.update(categoryToUpdate, {
      where: { id },
    });
    return updatedRow[0] === 1;
  },
  /**
   * Delete category with the provided ID.
   * @memberof module:services/category
   * @param {*} id - The ID of the training to delete.
   * @returns {Promise<boolean>} - A promise that resolves once the training has been successfully deleted.
   * @throws {Error} - If the operation fails or encounters an error.
   */
  delete: async (id) => {
    const nbDeletedRow = await db.Category.destroy({
      where: { id },
    });
    return nbDeletedRow === 1;
  },
  /**
   * Updates the cover image for a category with the provided ID.
   * @memberof module:services/category
   * @param {string} id - The ID of the category to update the cover image for.
   * @param {string} filename - The filename of the new cover image.
   * @returns {Promise<boolean>} - A promise that resolves to true if the cover image update was successful, or false otherwise.
   * @throws {Error} - If the operation fails or encounters an error.
   */
  updateCover: async (id, filename) => {
    const data = {
      cover: `/images/covers/${filename}`,
    };
    const updatedRow = await db.Category.update(data, {
      where: { id },
    });
    return updatedRow[0] === 1;
  },
  /**
   * Checks if a category with the provided name already exists.
   * @memberof module:services/category
   * @param {*} name - The name of the category to check for existence.
   * @returns {Promise<boolean>} - A promise that resolves to true if a category with the provided name already exists, or false otherwise.
   * @throws {Error} - If the operation fails or encounters an error.
   */
  nameAlreadyExists: async (name) => {
    const category = await db.Category.findOne({ where: { name } });
    return category ? true : false;
  },
};

module.exports = trainingCategoryService;
