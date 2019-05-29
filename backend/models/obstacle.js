var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Obstacle = new Schema({
  position: {
    x: Number,
    y: Number
  },
  size: {
    width: Number,
    height: Number
  }
});

module.exports = mongoose.model('obstacle', Obstacle);
