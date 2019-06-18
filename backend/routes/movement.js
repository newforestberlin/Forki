const MovementController = require("../controller/movement");
const io = require('socket.io-client')
const piSocket = io.connect('http://192.168.2.67:3000');

exports.sockets = (socket) => {
  socket.on('setMovement', async command => {
    command.direction = await MovementController.directionConverter(command)
    if(command.direction === false) {
      console.log("wrong command");
      return;
    }
    piSocket.emit('setMovement',
      command);
  });
}
