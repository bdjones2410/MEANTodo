var express = require('express');
var router = express.Router();
var config = require('../config');
var User = require('../schemas/users');
var genToken = require('./tokenMaker').generateToken;
var authToken = require('./tokenMaker').authToken;

//LOGIN ROUTE//

router.route('/login')
  .post(function(req, res, next){
    User.findOne({uname: req.body.uname},
      function(err, user, next){
        if (err) return next(err);
        if(!user){
          return res.status(401).send({
            message:'Wrong username and/or password'
          });
        }
      user.comparePassword(req.body.password, function(err, isMatch){
        if (err) throw err;
        if(!isMatch){
          return res.status(401).send({
            message:'Wrong username and/or password'
          });
        }
        res.send({token: genToken(user)});
      });
   });
});

//create User

router.route('/signup')
  .post(function(req, res){
    User.findOne({uname: req.body.uname}, function(err, isMatch){
      if(isMatch){
        return res.status(409).send({
          message: 'Username is already taken'
        });
      }
      var user = new User({
        uname: req.body.uname,
        password: req.body.password
      });
      user.save(function(err){
        if(err) throw err;
        res.send({
          token: genToken(user)
        });
      });
    });
  });

module.exports = router;
