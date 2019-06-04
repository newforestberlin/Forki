const PF = require('pathfinding');

async function getUnwalkables(obstacleParameters, elementSize, clearance) {
  return new Promise(async (resolve) => {
    let unwalkables = [];
    for (let i = 0; i < obstacleParameters.length; i++) {
      unwalkables.push(await getUnwalkable(obstacleParameters[i], elementSize, clearance));
    }
    unwalkables = [].concat.apply([], unwalkables);
    resolve(unwalkables);
  });
}

function getUnwalkable(obstacleParameter, elementSize, clearance) {

  return new Promise(async (resolve) => {
    const unwalkable = [];

    if (obstacleParameter) {
      const width = (obstacleParameter.size.width / elementSize) + parseInt(clearance);
      const height = (obstacleParameter.size.height / elementSize) + parseInt(clearance);
      const xOffset = (obstacleParameter.position.x / elementSize) - parseInt(clearance) / 2;
      const yOffset = (obstacleParameter.position.y / elementSize) - parseInt(clearance) / 2;

      for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
          unwalkable.push({
            x: Math.round(xOffset + x),
            y: Math.round(yOffset + y)
          });
        }
      }
      resolve(unwalkable);
    } else {
      resolve(unwalkable)
    }
  });
}

function setUnwalkables(unwalkables, width, height, elementSize) {
  let grid = new PF.Grid(width / elementSize, height / elementSize);
  return new Promise((resolve) => {
    for (let i = 0; i < unwalkables.length; i++) {
      if (unwalkables[i].x >= 0 && unwalkables[i].x < (width / elementSize) && unwalkables[i].y < (height / elementSize) && unwalkables[i].y >= 0) {
        grid.setWalkableAt(unwalkables[i].x, unwalkables[i].y, false);
      }
    }
    resolve(grid);
  });
}

async function findPath(robotPosition, targetPosition, grid) {
  finder = new PF.BiDijkstraFinder({
    allowDiagonal: true,
    dontCrossCorners: true
  });
  const path = finder.findPath(robotPosition.x, robotPosition.y, targetPosition.x, targetPosition.y, grid)
  return path;
}

module.exports = {
  getUnwalkables,
  setUnwalkables,
  findPath
}
