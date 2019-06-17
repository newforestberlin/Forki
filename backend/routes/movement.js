const MovementController = require("../controller/movement");
exports.sockets = (socket, io) => {
  socket.on('setMovement', async command => {
    command.direction = await MovementController.directionConverter(command)
    if(command.direction === false) {
      console.log("wrong command");
      return;
    }
    const piSocket = io.connect('http://192.168.2.67:3000', {
      reconnection: true
    });
    piSocket.emit('setMovement',
      command);
  });
}
