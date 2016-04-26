var express = require('express');
var router = express.Router();
var config = require('../config');
var List = require('../schemas/lists');
var User = require('../schemas/users');
var genToken = require('./tokenMaker').generateToken;
var authToken = require('./tokenMaker').authToken;


router.route('/create')
  .post(authToken, function(req, res){
    var myid = req.user;
    var list = new List({
      user_id: myid,
      list_name:req.body.listName
    });
    todo.save(function(err){
      res.status(200).send(list);
    });
  });

router.route('/:id')
  .delete(authToken, function(req, res){
    List.findById(req.params.id, function(err, result){
      if(err) throw err;
      result.remove(function(){
        res.status(200).send('removed One');
      });
    });
  });

router.route('/getlists')
  .get(authToken, function(req, res){
    List.find({user_id: req.user}, function(err, lists){
        if(err) throw err;
        if(lists.length != 0){
          return res.status(200).send(lists);
        }
        var defaultList = new List({
          user_id: req.user,
          list_name: "Mean List"
        });
        defaultList.save(function(err){
         res.send(defaultList);
        });
    });
  });

module.exports = router;
