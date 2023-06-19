require("dotenv").config();
require("express-async-errors");

const http = require("http");
const WebSocket = require("ws");

/**
 * Web Socket Server
 *
 * @module app/wss
 * @see {@link http://testwebsocket}
 */

function heartbeat() {
  this.isAlive = true;
}

//initialize a simple http server
const httpServer = http.createServer();

//initialize the WebSocket server instance
const wss = new WebSocket.Server({
  noServer: true,
  clientTracking: true,
  // server: httpServer,
});

// FIXME:
/**
 * Http Server Upgrade event
 */
httpServer.on("upgrade", (request, socket, head) => {
  console.log("> HTTP Server upgrade");
  // Make sure that we only handle WebSocket upgrade requests
  console.log("Checking headers... ");
  if (request.headers["upgrade"] !== "websocket") {
    socket.end("HTTP/1.1 400 Bad Request");
    return;
  }

  //
  console.log("Handle upgrade...");
  wss.handleUpgrade(request, socket, head, function done(ws) {
    wss.emit("connection", ws, request);
  });
});
// function
// httpServer.on("upgrade", (req, socket, head) => {
//   console.log("\n> Socket upgrade");
//   console.log("Request url: ", req.url);
//   if (req.url === "/") {
//     webSocketServer.handleUpgrade(req, socket, head, (ws) => {
//       console.log("Socket handleUpgrade");
//       //const authenticated = validateToken(req.headers.cookie);
//       const authenticated = true;
//       if (!authenticated) {
//         ws.close(1008, "Unauthorized"); // 1008: policy violation
//         return;
//       }
//       webSocketServer.emit("connection", ws, req);
//     });
//   } else {
//     socket.write(
//       "HTTP/1.1 401 Web Socket Protocol Handshake\r\n" +
//         "Upgrade: WebSocket\r\n" +
//         "Connection: Upgrade\r\n" +
//         "\r\n"
//     );
//     // socket.close();
//     socket.destroy();
//     return;
//   }
// });

// Clients map
const clients = [];

// Web Socket Server
wss.on("connection", (ws, request) => {
  console.log("\n> Web Socket Server connection event:");
  console.log("Web socket server clients : ", wss.clients.size);
  console.log("Logged in clients: ", clients.length);
  // console.log(wss.clients);
  ws.isAlive = true;

  console.log("Clients: ", getAllWSSClients());

  ws.on("open", function open() {
    console.log("\n> Socket connected!");
    ws.send(Date.now());
  });

  /**
   * Web Socket Message event
   */
  ws.on("message", (data, isBinary) => {
    // FIXME: error validation
    const message = JSON.parse(data);
    console.log("\n> Message received: ", message);
    switch (message.type) {
      /**
       *
       */
      case "USER_LOGIN":
        console.log("\n> USER_LOGIN");
        // const userLogin = await userSchema.validate(message);
        handleUserLogin(ws, message.content, isBinary);
        break;
      /**
       *
       */
      case "USER_LOGOUT":
        console.log("\n> USER_LOGOUT ");
        handleUserLogout(ws, message.content.userId);
        break;
      /**
       *
       */
      case "SEND_MESSAGE":
        console.log("\n> SEND_MESSAGE", message);
        broadcastOtherMessage(ws, message, isBinary);
        break;
      /**
       *
       */
      case "SEND_MESSAGE_TO":
        console.log("\n> SEND_MESSAGE_TO");
        console.log("WSS clients: ", wss.clients.size);
        console.log("Logged in clients ", clients.size);
        // Retrieve
        sendMessageToUser(
          ws,
          message.content.userId,
          message.content.message,
          isBinary
        );
        break;
      /**
       *
       */
      case "GET_CLIENTS_LIST":
        console.log("\n> GET_CLIENTS_LIST");
        console.log("WSS clients: ", wss.clients.size);
        console.log("Logged in clients: ", clients.size);
        returnMessageToSocket(ws, JSON.stringify(getAllWSSClients()), isBinary);
        //
        break;
      /**
       *
       */
      case "GET_WSS_CLIENTS_NUMBER":
        console.log("\n> GET_WSS_CLIENTS_LIST_NUMBER");
        console.log("WSS clients: ", wss.clients.size);
        returnMessage(ws, wss.clients.size, isBinary);
        break;
    }
  });

  /**
   * Web Socket Ping event
   */
  ws.on("ping", (data) => console.log(data));

  /**
   * Web Socket Pong event
   */
  ws.on("pong", (data) => console.log(data));

  /**
   * Web Socket Error event
   */
  ws.on("error", (error) => console.error(error));

  /**
   * Web Socket Error event
   */
  ws.on("close", (code, reason) => handleDisconnect(ws));

  // Return a response to the client
  ws.send("WebSocket server connection.");
});

const interval = setInterval(function ping() {
  wss.clients.forEach(function each(ws) {
    if (ws.isAlive === false) return ws.terminate();
    ws.isAlive = false;
    ws.ping();
  });
}, 25000);

const id = setInterval(function () {
  // ws.send(JSON.stringify(process.memoryUsage()), function () {
  //   //
  //   // Ignore errors.
  //   //
  // });
  wss.clients.forEach((client) => {
    // client.ping();
    console.log("Client info wss: ", client.info);
  });
}, 10000);

/**
 * Web Socket Server Error
 */
wss.on("error", (error) => console.error(error));

wss.on("close", function close() {
  clearInterval(interval);
});

// ---> Helpers

/**
 * Handle user login.
 * Add the websocket to the list of logged in clients.
 * Broadcast a message to all connected clients that the client connected.
 * Send a message to the client that it has connected.
 *
 * @param {*} ws
 * @param {*} userId
 * @param {*} isBinary
 */
function handleUserLogin(ws, userId, isBinary) {
  console.log("\n> handleUserLogin: ", userId);
  console.log("WSS clients before: ", wss.clients.size);
  console.log("Logged in clients before ", clients.size);
  // Add information to the web socket
  ws.info = {
    userId: userId,
    username: "",
  };
  clients.push(ws);

  // Broadcast message to other clients
  broadcastOtherMessage(
    ws.data,
    JSON.stringify({
      type: "USER_LOGGED_IN",
      content: {
        userId: userId,
      },
    }),
    isBinary
  );
  // Send message to client
  // returnMessage(ws, userId, "USER_LOGGED_IN", isBinary);
  returnMessageToSocket(ws, "test message", isBinary);
}

function handleUserLogout(ws, userId, isBinary) {
  console.log("\n> handleUserLogout ", userId);
  console.log("WSS clients before: ", wss.clients.size);
  console.log("Logged in clients before ", clients.length);
  const deleted = clients.b(userId);
  console.log("Client deleted: ", deleted);
  console.log("WSS clients after: ", wss.clients.size);
  console.log("Logged in clients after", clients.size);
  broadcastOtherMessage(
    ws,
    JSON.stringify({
      type: "USER_LOGGED_OUT",
      content: {
        userId: userId,
      },
    }),
    isBinary
  );
}

function handleDisconnect(ws) {
  console.log("\n> Socket disconnect: ");
  // console.log("WS", wss);
  console.log("WSS clients before: ", wss.clients.size);
  console.log("Logged in clients ", clients.size);
  // TODO: loop through clients map to find websocket
  clients.forEach((client, i) => {
    if (client === ws) clients.splice(i, 1);
  });
  console.log("Client deleted!");
}

// Messages utils

function returnMessage(ws, userId, message, isBinary) {
  console.log("> Socket send to self: ", userId);
  ws.send(
    JSON.stringify({
      type: "USER_RETURN",
      content: {
        userId: userId,
        message: message,
      },
    }),
    { isBinary: isBinary }
  );
}

/**
 *
 * @param {*} ws
 * @param {*} data
 * @param {*} isBinary
 */
function returnMessageToSocket(ws, data, isBinary) {
  console.log("> Return message to socket: ", data);
  ws.send(
    JSON.stringify({
      type: "USER_RETURN",
      content: {
        message: data,
      },
    }),
    { isBinary: isBinary }
  );
}

/**
 *
 * @param {*} ws
 * @param {*} userId
 * @param {*} data
 * @param {*} isBinary
 */
function sendMessageToUser(ws, userId, data, isBinary) {
  console.log("> Socket send message to userId: ", {
    userId: userId,
    data: data,
  });
  // FIXME:
  const client = clients.get(Number(userId));
  if (!client) {
    console.log(`Client with ${userId} not found!`);
    // Send an error message to client who made the request.
    returnMessageToSocket(
      ws,
      JSON.stringify({
        thype: "ERROR",
        content: `Client with ${userId} not found!`,
      }),
      isBinary
    );
  }
  if (client !== ws && client.readyState === WebSocket.OPEN) {
    console.log("Recipient web socket open");
    client.send(data, { binary: isBinary });
  }
}

/**
 * Broadcast to every other connected WebSocket clients, excluding itself.
 * @param {*} ws
 * @param {*} data
 * @param {*} isBinary
 */
function broadcastOtherMessage(ws, data, isBinary) {
  console.log(
    `> Socket broadcast to all clients (${clients.size}), excluding itself`,
    data
  );
  wss.clients.forEach(function each(value, key, map) {
    if (value !== ws && value.readyState === WebSocket.OPEN) {
      console.log("-> Send to client userId: ");
      value.send(data.data, { binary: isBinary });
    }
  });
}

/**
 * Broadcast to all connected WebSocket clients, including itself.
 * @param {*} ws
 * @param {*} data
 * @param {*} isBinary
 */
function broadcastMessage(data, isBinary) {
  console.log("> Broadcast to all clients, including itself : ", data);
  clients.forEach(function each(value, key, map) {
    if (value.readyState === WebSocket.OPEN) {
      console.log("-> Send to client userId", key);
      value.send(data, { binary: isBinary });
    }
  });
}

/**
 * Retrieve all WebSockerServer clients information
 * @returns
 */
function getAllWSSClients() {
  let list = [];
  wss.clients.forEach((client) => {
    if (client.info) {
      console.log("WSS Client userId: ", client.userId);
      list.push(client.info);
    }
  });
  return list;
}

function getWSSClientById(userId) {
  wss.clients.forEach((client) => {
    if (client.info.userId === userId) return client;
  });
  return null;
}

/**
 * Start the server
 */
httpServer.listen(process.env.SOCKET_PORT || 8999, () => {
  console.log(
    `[${new Date().toLocaleString()}] Server Socket started on port ws://localhost:${
      httpServer.address().port
    }`
  );
});
