exports.sockets = (socket, io) => {
  socket.on('setSonarParameter', async data => {
    console.log(data)
    io.emit('getSonarParameter', {
      sonar: data
    });
  });
}
