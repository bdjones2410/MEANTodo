(function() {
  'use strict';
    angular
      .module('mean-todo')
      .controller('MainController', function($uibModal, $scope, $auth, $http, mainService){
        var vm = this;
          $scope.open = function(){
            var modalInstance = $uibModal.open({
              templateUrl: 'views/register.html',
              controller: 'ModalInstanceCtrl',
              size: 'md'
            });
        };

          $scope.todoPost = function(todoMessage){
            $http.post('/todo/add', {todo: todoMessage})
            .success(function(res){
              console.log(res);
            });
          };


          // REFACTORED TO SERVICE
          $scope.login = function(user, pword){
            mainService.login(user, pword).then(function(res){
              vm.username = res.user;
              vm.todos = res.todos;
            });

          };

          $scope.logout = function(){
            mainService.logout().then(function(){
              vm.todos = [];
            });
          };

          $scope.isAuthenticated = function(){
            return mainService.auth();
          };

          if(mainService.auth()){
            mainService.populate().then(function(res){
              console.log(res);
              vm.username = res.user;
              vm.todos = res.todos;
            });
          }


        });

}());
