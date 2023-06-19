/**
 * Socket.io client event handlers
 * @param {*} io
 * @returns
 */
module.exports = (io) => {
  const yell = function (payload) {
    console.log("yell: ", payload);
    const socket = this;
    io.emit("messaging:yell :", {
      username: socket.data.username,
      message: payload.message,
    });
  };

  const talk = function (payload) {
    console.log("talk: ", payload);
    const socket = this;
    io.emit("messaging:talk", {
      username: socket.data.username,
      message: payload.message,
    });
  };

  return {
    yell,
    talk,
  };
};
