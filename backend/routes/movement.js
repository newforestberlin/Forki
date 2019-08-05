const MovementController = require("../controller/movement");
const io = require('socket.io-client')
require('dotenv').config()
const piSocket = io.connect(process.env.RASPBERRY_BACKEND_URL);

exports.sockets = (socket) => {
  socket.on('setMovement', async command => {
    if (await MovementController.directionValidator(command) === false) {
      console.log("wrong command");
      return;
    } else {
      piSocket.emit('setMovement',
        command);
    }
  });
}
