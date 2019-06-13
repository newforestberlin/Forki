const RoutingController = require("../controller/routing");

exports.sockets = (socket, io) => {
  socket.on('getPath', async data => {
    console.log('path request received: ' + data);
    const path = await RoutingController.getPath(data);
    io.emit('getPath',
      path);
  });

  socket.on('robotposition', async data => {
    console.log('robot request received: ' + data);
    const position = await RoutingController.getRobotPosition(data);
    io.emit('robotposition', {
      position: position
    });
  });

  socket.on('targetposition', async data => {
    console.log('target request received: ' + data);
    const position = await RoutingController.getTargetPosition(data);
    io.emit('targetposition', {
      position: position
    });
  });

  socket.on('obstacleparameters', async data => {
    console.log('obstacle request received: ' + data);
    const parameter = await RoutingController.getObstacleParameters(data);
    io.emit('obstacleparameters', {
      parameter: parameter
    });
  });

  socket.on('robotupdate', async data => {
    console.log('update robot: ' + data);
    const result = await RoutingController.setRobotPosition(data);
    io.emit('robotupdate', {
      result: result
    });
  });

  socket.on('targetupdate', async data => {
    console.log('update target: ' + data);
    const result = await RoutingController.setTargetPosition(data);
    io.emit('targetupdate', {
      result: result
    });
  });

  socket.on('obstacleupdate', async data => {
    console.log('update obstacle: ' + JSON.stringify(data));
    const result = await RoutingController.setObstacleParameters(data);
    console.log(result);
    io.emit('obstacleupdate', {
      result: result
    });
  });

}
