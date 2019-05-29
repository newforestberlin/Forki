var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Target = new Schema({
  x: Number,
  y: Number
});

module.exports = mongoose.model('target', Target);
