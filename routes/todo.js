var express = require('express');
var router = express.Router();
var List = require('../schemas/lists');
var Todo = require('../schemas/todo');
var authToken = require('./tokenMaker').authToken;
var getID = require('./tokenMaker').getID;

router.route('/add')
  .post(authToken, function(req, res){
    var myid = req.user;
    var todo = new Todo({
      user_id: myid,
      list_id: req.body.list_id,
      todo: req.body.todo,
      notes: []
    });
    todo.save(function(err){
      res.send(todo);
    });
  });

router.route('/getall/:listId')
  .get(authToken, function(req, res){
    Todo.find({list_id: req.params.listId}, function(err, todos){
        if(err) throw err;
        res.status(200).send(todos);
    });
  });

router.route('/:id')
  .delete(authToken, function(req, res){
    Todo.findById(req.params.id, function(err, result){
      if(err) throw err;
      result.remove(function(){
        res.status(200).send('removed One');
      });
    });
  });

module.exports = router;
