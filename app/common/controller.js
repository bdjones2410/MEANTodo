(function() {
  'use strict';
    angular
      .module('mean-todo')
      .controller('MainController', function($scope, $auth, $http, mainService){
          $scope.login = function(){
            $auth.login({
              uname: $scope.uname,
              password: $scope.password
            }).then(function(res){
              console.log(res);
            });
          };

          $scope.signup = function(){
            $auth.signup({
              uname: $scope.signupname,
              password: $scope.signuppass
            }).then(function(res){
              console.log(res);
            });
          };

          $scope.logout = function(){
            console.log('loggingout');
            $auth.logout();
          };

          $scope.isAuthenticated = function(){
            return $auth.isAuthenticated();
          };

          $scope.getall = function(){
            $http.get('/todo/getall')
            .success(function(res){
              console.log(res);
            });
          };

          $scope.todoPost = function(todoMessage){
            $http.post('/todo/add', {todo: todoMessage})
            .success(function(res){
              console.log(res);
            });
          };
        });

}());
