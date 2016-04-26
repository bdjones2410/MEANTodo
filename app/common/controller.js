(function() {
  'use strict';
    angular
      .module('mean-todo')
        .controller('MainController', ['$scope','$uibModal', 'mainService', function($scope, $uibModal, mainService){

          var vm = this;

          vm.delete = function(id){
            mainService.deleteTodo(id).then(function(){
              vm.populate();
            });
          };

          vm.todoPost = function(todo){
            mainService.createTodo(todo)
            .then(function(){
              $scope.todoval = "";
              vm.populate();
            });
          };

          vm.populate = function(){
            mainService.populate()
            .then(function(res){
              vm.username = res.user;
              vm.todos = res.todos;
            });
          };

          vm.login = function(user, pword){
            mainService.login(user, pword)
            .then(function(res){
              vm.populate();
            });

          };

          vm.logout = function(){
            mainService.logout().then(function(){
              vm.todos = [];
            });
          };

          vm.isAuthenticated = function(){
            return mainService.auth();
          };

          //MODAL
          vm.open = function(){
            var modalInstance = $uibModal.open({
              templateUrl: 'views/register.html',
              controller: 'ModalInstanceCtrl',
              size: 'md'
            });
          };

          if(mainService.auth()){
            vm.populate();
          }

      }]);
}());
