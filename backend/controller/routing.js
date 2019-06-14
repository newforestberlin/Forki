var PF = require('pathfinding');
var database = require("../service/database");
var pathfinder = require("../service/pathfinder");
var trilateration = require("../service/trilateration");

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

exports.getRobotPositionRealtime = async () => {
  return new Promise(async (resolve) => {
    const AN0 = await database.getAnchorParameters("5C2F");
    const AN1 = await database.getAnchorParameters("0F8C");
    const AN2 = await database.getAnchorParameters("8182");
    if (AN0 && AN1 && AN2) {
      resolve(await trilateration.getRobotPositionRealtime(AN0, AN1, AN2));
    } else resolve();
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

exports.getAnchorParameters = async (data) => {
  const id = data.id;
  return await database.getAnchorParameters(id);
}

exports.setAnchorParameter = (data) => {
  const dataObject = JSON.parse(data.data);
  return new Promise((resolve) => {
    database.anchorUpdate(dataObject.id, dataObject).then(msg => {
      resolve(msg);
    }).catch(err => {
      resolve(err);
    });
  });
}

exports.setAnchorPosition = (data) => {
  return new Promise((resolve) => {
    database.anchorPositionUpdate(data.id, data).then(msg => {
      resolve(msg);
    }).catch(err => {
      resolve(err);
    });
  });
}

