const { Op } = require("sequelize");
const { UserDTO } = require("../dto/user.dto");
const db = require("../models");

/**
 * Service to create, update, and retrieve user information.
 * @module services/users
 */
module.exports = {
  /**
   * Search for users based on the provided search terms.
   * @memberof module:services/users
   * @param {string} terms - The search terms to match against users first names, last names.
   * @returns {Promise<UserDTO[]>} A promise that resolves to an array of User objects matching the search terms.
   * @throws {Error} - If the operation fails or encounters an error.
   */
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

  /**
   * Retrieve a paginated list of users.
   * @memberof module:services/users
   * @param {number} offset - The number of items to skip before starting to return results.
   * @param {number} limit - The maximum number of items to return.
   * @returns {Promise<UserDTO[]>} A promise that resolves to an object containing an array of UserDTO objects representing the users and the total count of users.
   * @throws {Error} - If the operation fails or encounters an error.
   */
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

  /**
   * Retrieve details of a user.
   * @memberof module:services/users
   * @param {string} userId - The ID of the user to retrieve.
   * @returns {Promise<UserDTO>}
   * @throws {Error} - If the operation fails or encounters an error.
   */
  getById: async (userId) => {
    const user = await db.User.findByPk(userId, {
      // include:
    });
    return user ? new UserDTO(user) : null;
  },

  /**
   * Create user with the provided data.
   * @memberof module:services/s/student
   * @param {*} userToAdd - The user data to be added.
   * @returns {Promise<UserDTO|null>} A promise that resolves to a new UserDTO instance representing the created user, or null if creation fails.
   * @throws {Error} - If the operation fails or encounters an error.
   */
  create: async (userToAdd) => {
    const user = await db.User.create(userToAdd);
    return user ? new UserDTO(user) : null;
  },

  /**
   * Update user details with the provided data.
   * @memberof module:services/users
   * @param {string} userId - The ID of the user to update.
   * @param {*} userUpdate - The updated data for the user.
   * @returns {Promise<boolean>} - A promise that resolves to true if the user was successfully updated, or false otherwise.
   * @throws {Error} - If the operation fails or encounters an error.
   */
  update: async (userId, userUpdate) => {
    const updatedRow = await db.User.update(userToUpdate, {
      where: { id: userId },
    });
    return updatedRow[0] === 1;
  },

  /**
   * Delete user with provided ID.
   * @memberof module:services/users
   * @param {*} userId - The ID of the user to delete.
   * @returns {Promise<boolean>} - A promise that resolves to true if the user was successfully deleted, or false otherwise.
   * @throws {Error} - If the operation fails or encounters an error.
   */
  delete: async (userId) => {
    const nbDeletedRow = await db.User.destroy({
      where: { id: userId },
    });
    return nbDeletedRow === 1;
  },
};
