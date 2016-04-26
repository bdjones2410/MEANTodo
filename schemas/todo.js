var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var authUser = require('../routes/tokenMaker').authToken;
var moment = require('moment');


var todoSchema = new Schema({
  list_id: {type:Schema.Types.Mixed, selected:false},
  user_id: {type:Schema.Types.Mixed, select:false},
  todo: {type: String, require: true},
  completed: {type:Boolean, default: false},
  compDate: {type: Date, default:null},
  notes: [String],
  created: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Todo', todoSchema);
