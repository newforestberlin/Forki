exports.sockets = (socket, io) => {
  socket.on('setSonarParameter', async data => {
    io.emit('getSonarParameter', {
      sonar: data
    });
  });
}
