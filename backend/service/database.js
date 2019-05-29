
var Robot = require('../models/robot');
var Target = require('../models/target');
var Obstacle = require('../models/obstacle');

const robotPosition = function getRobotPositionDatabase() {
  return new Promise((resolve) => {
    Robot.find({}).then(robotPosition => {
      resolve(robotPosition);
    });
  });
}

const targetPosition = function getTargetPositionDatabase() {
  return new Promise((resolve) => {
    Target.find({}).then(targetPosition => {
      resolve(targetPosition);
    });
  });
}

const obstacleParameter = function getObstacleParametersDatabase() {
  return new Promise((resolve) => {
    Obstacle.find({}).then(obstacleParameter => {
      resolve(obstacleParameter);
    });
  });
}

module.exports = {robotPosition,targetPosition,obstacleParameter}