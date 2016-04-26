(function() {
  'use strict';
    angular
      .module('mean-todo')
        .factory('mainService', ['$http', '$auth', function($http, $auth){
            var listId = 0;

            var login = function(user, pword){
                return $auth.login({
                  uname: user,
                  password: pword
                });
            };
            //populate ensures authenticated, and then returns the current
            //logged in username and all the todos associated with that user.
            //will be updated to return the all the todo lists as well once implemented.
            var populate = function(){
              if(auth){
                var retObj = {};
                return getUser()
                .then(function(res){
                  return retObj.user = res;
                })
                .then(function(){
                  return getLists()
                  .then(function(res){
                   retObj.lists = res;
                   return retObj;
                  });
                });
              }
            };

            var logout = function(){
              return $auth.logout();
            };

            var auth = function(){
              return $auth.isAuthenticated();
            };

            var getLists = function(){
              return $http.get('/list/getlists')
              .then(function(res){
                return res.data;
              });
            };

            var getUser = function(){
              return $http.get('/auth/curUser')
              .then(function(res){
                return res.data;
              });
            };

            var getTodos = function(listId){
              return $http.get('/todo/getall/'+listId)
              .success(function(res){
                return res;
              });
            };

            var createTodo = function(message, listId){
              return $http.post('/todo/add', {todo: message, list_id:listId})
              .success(function(res){
                return res;
              });
            };

            var createList = function(listname){
              return $http.post('/list/create', {list_name: listname})
              .success(function(res){
                return res;
              });
            };

            var deleteTodo = function(todo){
              return $http.delete('/todo/'+todo._id);
            };

            return {
              login:login,
              logout: logout,
              auth: auth,
              createTodo: createTodo,
              populate: populate,
              getTodos: getTodos,
              deleteTodo: deleteTodo,
              createList: createList
            };

        }]);
}());
