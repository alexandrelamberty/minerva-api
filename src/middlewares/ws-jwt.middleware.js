const userService = require("../services/user.service");
const jwt = require("../utils/jwt");

/**
 * Middleware to authenticate Web Socket connections.
 * @param {*} roles
 * @returns
 */
module.exports = (roles) => {
  return async (socket, next) => {
    const token = socket.handshake.auth.token;
    // FIXME: Check token
    const payload = await jwt.decode(token);
    // Check jwt
    const user = await userService.getById(payload.id);
    console.log("> Auth Middleware");
    console.log("token: ", token);
    // Update the socket date
    socket.data.token = token;
    socket.data.username = user.firstName + " " + user.lastName;
    socket.data.role = payload.role;
    next();
  };
};
