const movement = require('../services/movement.js.js')

exports.sockets = (socket) => {
    socket.on('setMovement', async command => {
        if (command) movement.move(command.direction, command.time)
    });
}