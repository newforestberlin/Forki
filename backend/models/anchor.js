var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Anchor = new Schema({
  id: String,
  data: {
    x: Number,
    y: Number,
    dist: Number
  }
});

module.exports = mongoose.model('anchor', Anchor);
