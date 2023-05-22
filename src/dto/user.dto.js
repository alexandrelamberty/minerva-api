class UserDTO {
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
