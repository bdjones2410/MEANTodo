var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');
var app = express();
var authRoute = require('./routes/auth');
var todoRoute = require('./routes/todo');

mongoose.connect(config.MONGO_URI, function(err){
  if(err) throw err;
  console.log("Success! Mongo running");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, 'app')));

app.use('/auth', authRoute);
app.use('/todo', todoRoute);

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
