var express = require('express');
var router = express.Router();
var config = require('../config');
var List = require('../schemas/lists');
var Todo = require('../schemas/todo');
var User = require('../schemas/users');
var genToken = require('./tokenMaker').generateToken;
var authToken = require('./tokenMaker').authToken;


router.route('/create')
  .post(authToken, function(req, res){
    var myid = req.user;
    var list = new List({
      user_id: myid,
      list_name:req.body.list_name
    });
    list.save(function(err){
      res.status(200).send(list);
    });
  });

router.route('/:id')
  .delete(authToken, function(req, res){
    //finds all todos in the list, and deletes them all before removing the list
    Todo.find({list_id: req.params.id}, function(err, todos){
      for(var i in todos){
        todos[i].remove();
      }
      List.findById(req.params.id, function(err, result){
        if(err) throw err;
        result.remove(function(){
          res.status(200).send('removed List');
        });
      });
    });
  });


router.route('/getlists')
  .get(authToken, function(req, res){
    List.find({user_id: req.user}, function(err, lists){
        if(err) throw err;
        //check to see if any lists exist, if not, create the default list
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
