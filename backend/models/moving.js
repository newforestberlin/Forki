var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var subSchema = mongoose.Schema({
    x: Number,
    y: Number
},{ _id : false });

var Moving = new Schema({
  id: Number,
  data: [subSchema]
});

module.exports = mongoose.model('moving', Moving);
