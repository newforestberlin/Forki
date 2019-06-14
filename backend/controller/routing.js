var database = require("../service/database");
var pathfinder = require("../service/pathfinder");

exports.getPath = async (data) => {
  return new Promise(async (resolve) => {
    const id = data.id;
    const width = data.width;
    const height = data.height;
    const elementSize = data.elementSize;
    const clearance = data.clearance;
    const robotPosition = await database.getRobotPosition(id);
    const targetPosition = await database.getTargetPosition(id);
    if (targetPosition.x || robotPosition.x) {
      const obstacleParameters = await database.getObstacleParameters(id);
      const unwalkables = await pathfinder.getUnwalkables(obstacleParameters, elementSize, clearance);
      const grid = await pathfinder.setUnwalkables(unwalkables, width, height, elementSize);
      pathfinder.findPath(robotPosition, targetPosition, grid).then(path => {
        resolve(path);
      });
    } else {
      resolve("missing Parameter");
    }
  });
}

exports.getRobotPosition = async (data) => {
  const id = data.id;
  return await database.getRobotPosition(id);
}

exports.setRobotPosition = (data) => {
  return new Promise((resolve) => {
    database.robotUpdate(data.id, data.x, data.y).then(msg => {
      resolve(msg);
    }).catch(err => {
      resolve(err);
    });
  });
}

exports.getTargetPosition = async (data) => {
  const id = data.id;
  return await database.getTargetPosition(id);
}

exports.setTargetPosition = (data) => {
  return new Promise((resolve) => {
    database.targetUpdate(data.id, data.x, data.y).then(msg => {
      resolve(msg);
    }).catch(err => {
      resolve(err);
    });
  });
}

exports.getObstacleParameters = async (data) => {
  const id = data.id;
  return await database.getObstacleParameters(id);
}

exports.setObstacleParameters = (data) => {
  return new Promise((resolve) => {
    database.obstacleUpdate(data.id, data.obstacleParameters).then(msg => {
      resolve(msg);
    }).catch(err => {
      resolve(err);
    });
  });
}

