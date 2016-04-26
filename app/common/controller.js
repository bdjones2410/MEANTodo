(function() {
  'use strict';
    angular
      .module('mean-todo')
        .controller('MainController', ['$scope','$uibModal', 'mainService', function($scope, $uibModal, mainService){

          var vm = this;
          vm.listId = 0;
          vm.todos =[];

          vm.getTodos = function(){
            mainService.getTodos(vm.listId).then(function(res){
              vm.todos = res.data;
            });
          };

          vm.delete = function(id){
            mainService.deleteTodo(id).then(function(){
              vm.populate();
            });
          };

          vm.todoPost = function(todo){
            mainService.createTodo(todo, vm.listId)
            .then(function(){
              $scope.todoval = "";
              vm.getTodos(vm.listId);
            });
          };

          vm.populate = function(){
            mainService.populate()
            .then(function(res){
              vm.username = res.user;
              vm.lists = res.lists;
              vm.listId = res.lists._id || res.lists[0]._id;
              console.log(vm.lists);
            })
            .then(function(res){
              vm.getTodos();
            });
          };

          vm.createList = function(listName){
            mainService.createList(listName)
            .then(function(res){
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
