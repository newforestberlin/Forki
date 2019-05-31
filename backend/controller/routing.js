var PF = require('pathfinding');
var database = require("../service/database");
var pathfinder = require("../service/pathfinder");

exports.getPath = async (req, res, next) => {

  const id = req.params.id;
  const width = req.params.width; // placeholder
  const height = req.params.height; // placeholder
  const elementSize = req.params.elementSize; // placeholder
  const robotPosition = await database.getRobotPosition(id);
  const targetPosition = await database.getTargetPosition(id);
  if (targetPosition.x || robotPosition.x) {
    const obstacleParameters = await database.getObstacleParameters(id);
    const unwalkables = await pathfinder.getUnwalkables(obstacleParameters);
    const grid = await pathfinder.setUnwalkables(unwalkables, width, height, elementSize);
    pathfinder.findPath(robotPosition, targetPosition, grid).then(path => {
      res.json(path);
    });
  } else {
    res.json("missing Parameter");
  }
}


exports.getRobotPosition = async (req, res, next) => {
  const id = req.params.id;
  res.json(await database.getRobotPosition(id));
}

exports.getTargetPosition = async (req, res, next) => {
  const id = req.params.id;
  res.json(await database.getTargetPosition(id));
}

exports.getObstacleParameters = async (req, res, next) => {
  const id = req.params.id;
  res.json(await database.getObstacleParameters(id));
}

exports.setTargetPosition = (req, res, next) => {
  database.targetUpdate(req).then(msg => {
    res.send(msg);
  }).catch(err => {
    res.send(err)
  });
}

exports.setRobotPosition = (req, res, next) => {
  database.robotUpdate(req).then(msg => {
    res.send(msg);
  }).catch(err => {
    res.send(err)
  });
}

exports.setObstacleParameters = (req, res, next) => {
  database.obstacleUpdate(req).then(msg => {
    res.send(msg);
  }).catch(err => {
    res.send(err)
  });
}
