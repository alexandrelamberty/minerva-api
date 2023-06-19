module.exports = (io) => {
  const createRoom = function (payload) {
    const socket = this; // hence the 'function' above, as an arrow function will not work
    // ...
  };

  const readRoom = function (roomId, callback) {
    // ...
  };

  const updateRoom = function (roomId, callback) {
    // ...
  };

  const deleteRoom = function (roomIdId, callback) {
    // ...
  };

  return {
    createRoom,
    readRoom,
    updateRoom,
    deleteRoom,
  };
};
