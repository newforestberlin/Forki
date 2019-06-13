var Robot = require('../models/robot');
var Target = require('../models/target');
var Obstacle = require('../models/obstacle');
var Anchor = require('../models/anchor');
var Moving = require('../models/moving');


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

function getAnchorParameters(id) {
  return new Promise((resolve) => {
    Anchor.find({
      id: id
    }).then(anchorParameter => {
      resolve(anchorParameter[0]);
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

function anchorUpdate(anchor, data) {
  data = JSON.parse(data)
  return Anchor.update({
    id: anchor
  }, {
    id: anchor,
    data: {
      x: data.x,
      y: data.y,
      dist: data.dist
    }
  }, {
    upsert: true
  })
}

function obstacleUpdate(id, obstacleParameters) {
  return Obstacle.update({
    id: id
  }, {
    id: id,
    obstacleParameters: obstacleParameters
  }, {
    upsert: true
  })
}

async function setMovingAverage(id, x, y) {
  return new Promise(async (resolve) => {
    let moving = await getMovingAverage(id);
    if (!moving) {
      moving = {
        id: id,
        data: []
      };
    }
    moving.data.unshift({
      x: x,
      y: y
    })
    console.log(moving);
    await dropData(moving);
    Moving.update({
      id: id
    }, moving, {
      upsert: true
    }).then(movingUpdated => {
      resolve(movingUpdated);
    });
  });

  function dropData(moving) {
    return new Promise((resolve) => {
      if (moving.data.length >= 20) {
        while (moving.data.length > 20) {
          moving.data.pop();
        }
      }
      resolve();
    });
  };
}


function getMovingAverage(id) {
  return new Promise((resolve) => {
    Moving.find({
      id: id
    }).then(moving => {
      resolve(moving[0]);
    });
  })
}

module.exports = {
  getRobotPosition,
  getTargetPosition,
  getAnchorParameters,
  getObstacleParameters,
  anchorUpdate,
  robotUpdate,
  targetUpdate,
  obstacleUpdate,
  setMovingAverage,
  getMovingAverage
}
