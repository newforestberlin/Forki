var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Robot = new Schema({
  id: Number,
  x: Number,
  y: Number
});

module.exports = mongoose.model('robot', Robot);
