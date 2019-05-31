const PF = require('pathfinding');

const unwalkables = async function getUnwalkables() {
  return new Promise(async (resolve) => {
    let unwalkables = [];
    for (let i = 0; i < obstacleParameters.length; i++) {
      unwalkables.push(await getUnwalkable(obstacleParameters[i]));
    }
    unwalkables = [].concat.apply([], unwalkables);
    resolve(unwalkables);
  });
}

function getUnwalkables(obstacleParameter) {

  return new Promise(async (resolve) => {
    const unwalkable = [];
    if (obstacleParameter) {
      if (obstacleParameter.size) {
        const width = obstacleParameter.size.width / elementSize + clearance;
        const height = obstacleParameter.size.height / elementSize + clearance;
        const xOffset = obstacleParameter.position.left / elementSize - clearance / 2;
        const yOffset = obstacleParameter.position.top / elementSize - clearance / 2;
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
    } else {
      resolve(unwalkable)
    }
  });
}

function setUnwalkables(unwalkables, width, height, elementSize) {
  let grid = new PF.Grid(width / elementSize, height / elementSize);
  return new Promise((resolve) => {
    for (let i = 0; i < unwalkables.length; i++) {
      if (unwalkables[i].x >= 0 && unwalkables[i].y >= 0) {
        grid.setWalkableAt(unwalkables[i].x, unwalkables[i].y, false);
      }
    }
    resolve(grid);
  });
}

async function findPath(robotPosition, targetPosition, grid) {
  finder = new PF.BiAStarFinder({
    allowDiagonal: true,
    dontCrossCorners: true
  });
  const path = finder.findPath(robotPosition.x, robotPosition.y, targetPosition.x, targetPosition.y, grid)
  return path;
}

module.exports = {
  getUnwalkables,
  setUnwalkables,
  unwalkables,
  findPath
}
