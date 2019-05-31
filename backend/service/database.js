var Robot = require('../models/robot');
var Target = require('../models/target');
var Obstacle = require('../models/obstacle');

function getRobotPosition(id) {
  return new Promise((resolve) => {
    Robot.find({
      id: id
    }).then(robotPosition => {
      resolve(robotPosition[0]);
    });
  });
}

function getTargetPosition(id) {
  return new Promise((resolve) => {
    Target.find({
      id: id
    }).then(targetPosition => {
      resolve(targetPosition[0]);
    });
  });
}

function getObstacleParameters(id) {
  return new Promise((resolve) => {
    Obstacle.find({
      id: id
    }).then(obstacleParameter => {
      resolve(obstacleParameter[0].obstacleParameters);
    });
  });
}

function targetUpdate(req) {
  return Target.update({
    id: req.body.id
  }, {
    id: req.body.id,
    x: req.body.x,
    y: req.body.y
  }, {
    upsert: true
  });
}

function robotUpdate(req) {
  return Robot.update({
    id: req.body.id
  }, {
    id: req.body.id,
    x: req.body.x,
    y: req.body.y
  }, {
    upsert: true
  });
}

async function obstacleUpdate(req) {
  const obstacleParameters = req.body.obstacleParameters;
  return Obstacle.update({
    id: req.body.id
  }, {
    id: req.body.id,
    obstacleParameters: obstacleParameters
  }, {
    upsert: true
  })
}

module.exports = {
  getRobotPosition,
  getTargetPosition,
  getObstacleParameters,
  robotUpdate,
  targetUpdate,
  obstacleUpdate,
}
