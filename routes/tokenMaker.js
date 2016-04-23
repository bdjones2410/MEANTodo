var jwt = require('jwt-simple');
var config = require('../config');
var moment = require('moment');
var User = require('../schemas/users');

//Create my Web Token
exports.generateToken = function(user){
  var payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(5, 'days').unix()
  };
  return jwt.encode(payload, config.TOKEN_SECRET);
};

//authentication assurance.

exports.authToken = function authToken(req, res, next){
  if(!req.headers.authorization){
    return res.status(401).send({message: 'Make sure your request has an authorization header'});
  }
  var token = req.headers.authorization.split(' ')[1];
  var payload = jwt.decode(token, config.TOKEN_SECRET);
  if(payload.exp <= moment().unix()) {
    return res.status(401).send({
      message: 'Expired Token'
    });
  }
  req.user = payload.sub;
  next();
};
