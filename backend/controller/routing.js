var PF = require('pathfinding');
var Target = require('../models/target');
var Obstacle = require('../models/obstacle');
var database = require("../service/database");

exports.getPath = async (req, res, next) => {
  const height = 500; // placeholder
  const width = 500; // placeholder
  const elementSize = 10; // placeholder
  let grid = new PF.Grid(width / elementSize, height / elementSize);
  const finder = new PF.BiAStarFinder({
    allowDiagonal: true,
    dontCrossCorners: true
  });

  const robotPosition = await database.robotPosition();
  const targetPosition = await database.targetPosition();
  const obstacleParameters = await database.obstacleParameter();
  const unwalkables = await getUnwalkables();
  console.log(unwalkables);
  grid = await setUnwalkables(unwalkables);
  if (targetPosition.x || robotPosition.x) {
    finder.findPath(robotPosition.x, robotPosition.y, targetPosition.x, targetPosition.y, grid).then(path => {
      res.json(path);
    });
  } else {
    res.json("missing Parameter");
  }



  async function getUnwalkables() {
    return new Promise(async (resolve) => {
      let unwalkables = [];
      for (let i = 0; i < obstacleParameters.length; i++) {
        unwalkables.push(await getUnwalkable(obstacleParameters[i]));
      }
      unwalkables = [].concat.apply([], unwalkables);
      resolve(unwalkables);
    });

    function getUnwalkable(obstacleParameter) {
      return new Promise(async (resolve) => {
        const width = obstacleParameter.size.width / elementSize + clearance;
        const height = obstacleParameter.size.height / elementSize + clearance;
        const xOffset = obstacleParameter.position.left / elementSize - clearance / 2;
        const yOffset = obstacleParameter.position.top / elementSize - clearance / 2;
        const unwalkable = [];
        for (let x = 0; x < width; x++) {
          for (let y = 0; y < height; y++) {
            unwalkable.push({
              x: Math.round(xOffset + x),
              y: Math.round(yOffset + y)
            });
          }
        }
        resolve(unwalkable);
      });
    }
  }

  function setUnwalkables(unwalkables) {
    return new Promise((resolve) => {
      for (let i = 0; i < unwalkables.length; i++) {
        if (unwalkables[i].x >= 0 && unwalkables[i].y >= 0) {
          grid.setWalkableAt(unwalkables[i].x, unwalkables[i].y, false);
        }
      }
      resolve(grid);
    });
  }
}


exports.getRobotPosition = async (req, res, next) => {
  res.json(await database.getRobotPositionDatabase());
}

exports.getTargetPosition = async (req, res, next) => {
  res.json(await database.getTargetPositionDatabase());
}

exports.getObstacleParameters = async (req, res, next) => {
  res.json(await database.getObstacleParametersDatabase());
}

exports.setTargetPosition = (req, res, next) => {
  req.body.id = 0;
  Target.update(req.body.id, req.body.targetPosition).then(msg, err => {
    res.send(msg);
  }).catch(err => {
    res.send(err)
  });
}

exports.setObstacleParameters = (req, res, next) => {
  console.log(req.body);
  req.body.id = 0;
  Obstacle.update(req.body.id, req.body.targetPosition).then(msg, err => {
    res.send(msg);
  }).catch(err => {
    res.send(err)
  });
}
