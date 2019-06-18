const LocalizationController = require("../controller/localization");

exports.sockets = (socket, io) => {

  // listener to the dwm1001 anchor socket
  socket.on('setAnchorParameters', async anchors => {
    anchors.map(async anchor => {
      await LocalizationController.setAnchorPosition(anchor);
      await LocalizationController.setAnchorDistance(anchor);
    });
    io.emit('getAnchorParameters', anchors);
  });

  // listener to the dwm1001 position socket
  socket.on('setRobotPosition', async data => {
    io.emit('getRobotPosition', {
      position: data
    });
  });

  // calculate position itself
  socket.on('getDatabaseRobotPosition', async () => {
    const position = await LocalizationController.getRobotPositionRealtime();
    io.emit('getDatabaseRobotPosition', {
      position
    });
  });
}
