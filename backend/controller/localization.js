var database = require("../service/database");
var trilateration = require("../service/trilateration");
require('dotenv').config()

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
    const AN0 = await database.getAnchorParameters("AN0");
    const AN1 = await database.getAnchorParameters("AN1");
    const AN2 = await database.getAnchorParameters("AN2");
    if (AN0 && AN1 && AN2) {
      resolve(await trilateration.getRobotPositionRealtime(AN0, AN1, AN2));
    } else resolve();
  });
}