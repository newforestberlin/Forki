var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Example = new Schema({
  exampleProperty: String
});

module.exports = mongoose.model('example', Example);
