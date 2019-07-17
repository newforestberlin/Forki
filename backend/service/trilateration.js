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
        distance: AN2.dist
      }
    ];
    var pos = getTrilateration(beacons[0], beacons[1], beacons[2]);
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
        // console.log("Error")
      }
      pos.x = mean.x
      pos.y = mean.y
    } else {
      console.log("Can't calculate trilateration")
    }
    console.log(mean);
    resolve(mean);
  });
}

function getTrilateration(position1, position2, position3) {
  var xa = position1.x;
  var ya = position1.y;
  var xb = position2.x;
  var yb = position2.y;
  var xc = position3.x;
  var yc = position3.y;
  var ra = position1.distance;
  var rb = position2.distance;
  var rc = position3.distance;

  var S = (Math.pow(xc, 2.) - Math.pow(xb, 2.) + Math.pow(yc, 2.) - Math.pow(yb, 2.) + Math.pow(rb, 2.) - Math.pow(rc, 2.)) / 2.0;
  var T = (Math.pow(xa, 2.) - Math.pow(xb, 2.) + Math.pow(ya, 2.) - Math.pow(yb, 2.) + Math.pow(rb, 2.) - Math.pow(ra, 2.)) / 2.0;
  var y = ((T * (xb - xc)) - (S * (xb - xa))) / (((ya - yb) * (xb - xc)) - ((yc - yb) * (xb - xa)));
  var x = ((y * (ya - yb)) - T) / (xb - xa);

  return {
    x: x,
    y: y
  };
}

module.exports = {
  getRobotPositionRealtime
}
