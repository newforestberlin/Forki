const MovementController = require("../controller/movement");
const io = require('socket.io-client')
const piSocket = io.connect('http://192.168.2.67:3000');

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
