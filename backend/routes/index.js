const RoutingController = require("../controller/routing");

exports.sockets = (socket, io) => {
  socket.on('getPath', async data => {
    const path = await RoutingController.getPath(data);
    io.emit('getPath',
      path);
  });

  socket.on('robotposition', async data => {
    const position = await RoutingController.getRobotPosition(data);
    io.emit('robotposition', {
      position: position
    });
  });

  socket.on('robotupdate', async data => {
    const result = await RoutingController.setRobotPosition(data);
    io.emit('robotupdate', result);
  });

  socket.on('realtimeRobot', async data => {
    const position = await RoutingController.getRobotPositionRealtime();
    io.emit('realtimeRobot', {
      position
    });
  });

  socket.on('targetposition', async data => {
    const position = await RoutingController.getTargetPosition(data);
    io.emit('targetposition', {
      position: position
    });
  });

  socket.on('targetupdate', async data => {
    const result = await RoutingController.setTargetPosition(data);
    io.emit('targetupdate', {
      result: result
    });
  });

  socket.on('obstacleparameters', async data => {
    const parameter = await RoutingController.getObstacleParameters(data);
    io.emit('obstacleparameters', {
      parameter: parameter
    });
  });

  socket.on('obstacleupdate', async data => {
    const result = await RoutingController.setObstacleParameters(data);
    io.emit('obstacleupdate', {
      result: result
    });
  });

  socket.on('anchorParameters', async data => {
    const result = await RoutingController.getAnchorParameters(data);
    io.emit('anchorParameters', {
      result: result
    });
  });

  socket.on('anchorUpdate', async data => {
    data.map(async anchor => {
      const result = await RoutingController.setAnchorParameter(anchor);
      io.emit('anchorUpdate', {
        result: result
      });
    });
  });

  socket.on('anchorPositionUpdate', async data => {
    const result = await RoutingController.setAnchorPosition(data);
    io.emit('anchorPositionUpdate', {
      result: result
    });
  });
}
