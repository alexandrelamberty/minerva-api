const { UserDTO } = require("../dto/user.dto");
const db = require("../models");
const bcrypt = require("bcrypt");

/**
 * Service for user authentication, including registration and login.
 * @module services/auth
 */
module.exports = {
  /**
   * Registers a new user account in the system.
   * @memberof module:services/auth
   * @param {*} userToAdd - The user data to add.
   * @returns {Promise<UserDTO>} A promise that resolves with the created user as a UserDTO instance, or null if creation fails.
   */
  register: async (userToAdd) => {
    // Password hashing with bcrypt or argon2, see the user model
    // to a hook implementation of password hashing.
    // const hashedPassword = await argon2.hash(userToAdd.password);
    const salt = await bcrypt.genSaltSync(11, "a");
    const hashedPassword = bcrypt.hashSync(userToAdd.password, salt);

    // Update the dto password
    userToAdd.password = hashedPassword;

    // Create and return the user.
    const user = await db.User.create(userToAdd);
    return user ? new UserDTO(user) : null;
  },
  /**
   * Logs a user into the system.
   * @memberof module:services/auth
   * @param {*} email - The user's email.
   * @param {*} password - The user's password.
   * @returns {Promise<UserDTO>} A promise that resolves with the authenticated user as a UserDTO instance, or null if authentication fails.
   */
  login: async (email, password) => {
    const user = await db.User.findOne({
      where: { email },
    });
    if (!user) {
      return null;
    }
    // const isValid = await argon2.verify(user.password, password);
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return null;
    }
    return new UserDTO(user);
  },
};
