var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var authUser = require('../routes/tokenMaker').authToken;
var moment = require('moment');


var todoSchema = new Schema({
  user_id: Schema.Types.Mixed,
  todo: {type: String, require: true},
  completed: {type:Boolean, default: false},
  notes: [String],
  created: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Todo', todoSchema);
