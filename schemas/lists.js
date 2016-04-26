var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var authUser = require('../routes/tokenMaker').authToken;
var moment = require('moment');


var ListSchema = new Schema({
    user_id: {type:Schema.Types.Mixed, select:false},
    list_name: String
});

module.exports = mongoose.model('List', ListSchema);
