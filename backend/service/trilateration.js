var trilateration = require('node-trilateration');
const database = require('../service/database')
let i = 0;

async function getRobotPositionRealtime(AN0, AN1, AN2) {
  return new Promise(async (resolve) => {
    var beacons = [{
        x: AN0.x,
        y: AN0.y,
        distance: AN0.dist,
      },
      {
        x: AN1.x,
        y: AN1.y,
        distance: AN1.dist,
      },
      {
        x: AN2.x,
        y: AN2.y,
        distance: AN2.dist,
      }
    ];
    var pos = trilateration.calculate(beacons);
    if (isFinite(pos.x)) {
      await database.setMovingAverage(0, pos.x, pos.y)
      const movingPositionsUpdated = await database.getMovingAverage(0)
      try {
        const reducer = (accumulator, currentValue) => {
          return {
            x: (accumulator.x + currentValue.x),
            y: (accumulator.y + currentValue.y)
          }
        };
        var mean = movingPositionsUpdated.data.reduce(reducer, {
          x: 0.0,
          y: 0.0
        });
        mean.x /= movingPositionsUpdated.data.length;
        mean.y /= movingPositionsUpdated.data.length;
      } finally {
        console.log("Error")
      }
      pos.x = mean.x
      pos.y = mean.y
    } else {
      console.log("Can't calculate trilateration")
    }
    // console.log(mean);
    resolve(pos);
  });
}

module.exports = {
  getRobotPositionRealtime
}
