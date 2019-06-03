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
      if (obstacleParameter[0]) {
        resolve(obstacleParameter[0].obstacleParameters);
      } else {
        resolve(null);
      }
    });
  });
}

function targetUpdate(id, x, y) {
  return Target.update({
    id: id
  }, {
    id: id,
    x: x,
    y: y
  }, {
    upsert: true
  });
}

function robotUpdate(id, x, y) {
  return Robot.update({
    id: id
  }, {
    id: id,
    x: x,
    y: y
  }, {
    upsert: true
  });
}

async function obstacleUpdate(id, obstacleParameters) {
  return Obstacle.update({
    id: id
  }, {
    id: id,
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
