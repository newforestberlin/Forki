const movement = require('../services/movement.js')

exports.sockets = (socket) => {
    socket.on('setMovement', async command => {
        if(command) movement.move(command.direction, command.time)
    });
}