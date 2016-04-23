var express = require('express');
var router = express.Router();
var config = require('../config');
var User = require('../schemas/users');
var genToken = require('./tokenMaker').generateToken;
var authToken = require('./tokenMaker').authToken;

//LOGIN ROUTE//

router.route('/login')
  .post(function(req, res, next){
      // findone by username,  add password field to query because
      // its not selected by default, so we need to specifically request it.
    User.findOne({uname: req.body.uname}, '+password',
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
        res.json({
          token: genToken(user)
        });
      });
    });
  });

//return the username to the front.

router.route('/curuser')
  .get(authToken, function(req,res){
    User.findOne({_id: req.user}, function(err, isMatch){
      if(isMatch){
        req.username = isMatch.uname;
        res.send(req.username);
      }
    });
  });

module.exports = router;
