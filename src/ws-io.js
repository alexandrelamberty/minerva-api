require("dotenv").config();
const { Server } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");
const jwt = require("./utils/jwt");
const userService = require("./services/user.service");
const wsJwtMiddleware = require("./middlewares/ws-jwt.middleware");

/**
 * Server instance
 * https://socket.io/docs/v4/server-instance/
 */
const io = new Server({
  cors: {
    origin: ["https://admin.socket.io", "http://localhost:5173"],
    // credentials: true,
  },
});

/**
 * Admin UI
 * https://socket.io/docs/v4/admin-ui/
 */
instrument(io, {
  auth: false,
  mode: "development",
});

/**
 * Socket events handlers
 */
const { yell, talk } = require("./handlers/messaging.handlers")(io);

/**
 * Server engine events
 */
// io.engine.on("initial_headers", (headers, req) => {
//   // headers["test"] = "123";
//   // headers["set-cookie"] = "mycookie=456";
// });

// io.engine.on("headers", (headers, req) => {
//   // headers["test"] = "789";
// });

// io.engine.on("connection_error", (err) => {
//   console.log(err.req); // the request object
//   console.log(err.code); // the error code, for example 1
//   console.log(err.message); // the error message, for example "Session ID unknown"
//   console.log(err.context); // some additional error context
// });

/**
 * Server Middlewares
 */
// FIXME: Change this later
io.use(wsJwtMiddleware());

/**
 * Server events
 */
io.on("connection", (socket) => {
  console.log("\n>>> Socket Connection");
  console.log("Socket id: ", socket.id);
  console.log("Socket rooms: ", socket.rooms);
  console.log("Socket data: ", socket.data);

  // socket.join("general");

  //
  socket.emit("messaging:connection", "... just connected!");
  socket.emit("notifications", "... just connected!");

  // Socket events
  // socket.on("messaging:yell", yell);
  socket.on("messaging:talk", talk);

  // socket.on("rooms:create", readOrder);
  // socket.on("rooms:read", readOrder);
  // socket.on("rooms:update", readOrder);
  // socket.on("rooms:delete", readOrder);

  /**
   * Socket events
   * https://socket.io/docs/v4/server-socket-instance/#events
   */
  socket.on("disconnect", (reason) => {
    console.log(`disconnect ${socket.id} due to ${reason}`);
  });

  socket.on("disconnecting", (reason) => {
    for (const room of socket.rooms) {
      if (room !== socket.id) {
        socket.to(room).emit("messaging:yell", socket.id);
      }
    }
  });
});

// const adminsNamespace = io.of("/admins");
// const studentsNamespace = io.of("/students");
// const teachersNamespace = io.of("/teachers");

// io.of("/admins").on("connection", (socket) => {
//   socket.on("user:list", () => {});
// });

// io.of("/students").on("connection", (socket) => {
//   socket.on("user:list", () => {});
// });

// io.of("/teachers").on("connection", (socket) => {
//   socket.on("user:list", () => {});
// });

io.listen(process.env.WS_PORT);
