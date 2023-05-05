class UserDTO {
  constructor({ id, firstName, lastName, username, email }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.email = email;
  }
}

module.exports = { UserDTO };
