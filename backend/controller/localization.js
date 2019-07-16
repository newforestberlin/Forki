var database = require("../service/database");
var trilateration = require("../service/trilateration");

exports.getAnchorParameters = async (data) => {
  const id = data.id;
  return await database.getAnchorParameters(id);
}

exports.setAnchorDistance = (data) => {
  return new Promise((resolve) => {
    database.setAnchorDistance(data.data.id, data.data).then(msg => {
      resolve(msg);
    }).catch(err => {
      resolve(err);
    });
  });
}

exports.setAnchorPosition = (data) => {
  return new Promise((resolve) => {
    if (data.data) {
      database.anchorPositionUpdate(data.data.id, data.data).then(msg => {
        resolve(msg);
      }).catch(err => {
        resolve(err);
      });
    }
  });
}

exports.getRobotPositionRealtime = async () => {
  return new Promise(async (resolve) => {
    const AN0 = await database.getAnchorParameters("5C2F");
    const AN1 = await database.getAnchorParameters("0F8C");
    const AN2 = await database.getAnchorParameters("8182");
    if (AN0 && AN1 && AN2) {
      resolve(await trilateration.getRobotPositionRealtime(AN0, AN1, AN2));
    } else resolve();
  });
}
