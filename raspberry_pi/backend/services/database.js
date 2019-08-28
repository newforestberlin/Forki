const redis = require('redis');
const client = redis.createClient();

exports.getAnchors = () => {
  return new Promise(async resolve => {
    let anchors = [];
    for (let i = 0; i < 3; i++) {
      anchors.push({
        anchor: "AN" + i,
        data: JSON.parse(await getAnchor("AN" + i))
      });
    }
    resolve(anchors);
  });

  function getAnchor(anchor) {
    return new Promise(resolve => {
      client.get(anchor, function (error, result) {
        if (error) {
          resolve(error);
          throw error;
        } else {
          resolve(result);
        }
      });
    })
  }
}

exports.getPosition = () => {
  return new Promise(resolve => {
    client.get("pos", function (error, result) {
      if (error) {
        resolve(error);
        throw error;
      } else {
        resolve(JSON.parse(result));
      }
    });
  })
}

exports.getUltrasonic = () => {
  return new Promise(resolve => {
    client.get("ultrasonic", function (error, result) {
      if (error) {
        resolve(error);
        throw error;
      } else {
        resolve(JSON.parse(result));
      }
    });
  })
}