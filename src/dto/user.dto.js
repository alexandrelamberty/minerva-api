/**
 * Data Transfer Object (DTO) for representing user details.
 */
class UserDTO {
  /**
   * Create a new instance of UserDTO.
   * @param {Object} params - The parameters for initializing the DTO.
   * @param {number} params.id - The ID of the user.
   * @param {string} params.firstName - The first name of the user.
   * @param {string} params.lastName - The last name of the user.
   * @param {string} params.username - The username of the user.
   * @param {string} params.email - The email address of the user.
   * @param {string} params.role - The role of the user.
   * @param {string} params.avatar - The avatar URL of the user.
   * @param {string} params.createdAt - The creation timestamp of the user.
   * @param {string} params.updatedAt - The update timestamp of the user.
   */
  constructor({
    id,
    firstName,
    lastName,
    username,
    email,
    role,
    avatar,
    createdAt,
    updatedAt,
  }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.email = email;
    this.role = role;
    this.avatar = avatar;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = { UserDTO };
