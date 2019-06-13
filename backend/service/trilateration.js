var trilateration = require('node-trilateration');

async function getRobotPositionRealtime(AN0, AN1, AN2) {
  return new Promise(async (resolve) => {
    var beacons = [{
        x: AN0.data.x,
        y: AN0.data.y,
        distance: AN0.data.dist,
      },
      {
        x: AN1.data.x,
        y: AN1.data.y,
        distance: AN1.data.dist,
      },
      {
        x: AN2.data.x,
        y: AN2.data.y,
        distance: AN2.data.dist,
      }
    ];
    var pos = trilateration.calculate(beacons);
    console.log("X: " + pos.x + "; Y: " + pos.y);
    resolve(pos);
  });
}

module.exports = {
  getRobotPositionRealtime
}
