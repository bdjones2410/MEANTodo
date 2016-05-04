(function() {
  'use strict';
    angular
      .module('mean-todo')
        .controller('MainController', ['$scope','$uibModal', 'mainService', function($scope, $uibModal, mainService){

          var vm = this;
          vm.listId = 5;
          vm.todos =[];
          vm.selectedList;

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

          vm.deleteList = function(list){
            if(list._id === vm.listId){
              vm.listId = 5;
            }
            if(vm.lists.length === 1){
              console.log("you need to have at least one list!");
            }else{
              mainService.deleteList(list).then(function(){
                vm.populate();
              });
            }

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
              if(vm.listId === 5){
                vm.listId = res.lists._id || res.lists[0]._id;
                vm.selectedList = res.lists.list_name || res.lists[0].list_name;
              }
            })
            .then(function(res){
              vm.getTodos();
            });
          };

          vm.createList = function(listName){
            mainService.createList(listName)
            .then(function(res){
              $scope.listname = "";
              vm.populate();
            });
          };

          vm.selectList = function(list){
            vm.listId = list._id;
            vm.selectedList = list.list_name;
            vm.getTodos();
          };

          vm.login = function(user, pword){
            mainService.login(user, pword)
            .then(function(res){
              $scope.pword= "";
              vm.populate();
            });
          };

          vm.toggleComplete = function(todo){
            if(todo.completed){
              todo.completed = false;
              todo.compDate = null;
            }else{
              todo.completed = true;
              todo.compDate = new Date();
            }
            mainService.updateTodo(todo).then(function(res){
              vm.populate();
            });
          };

          vm.logout = function(){
            mainService.logout().then(function(){
              vm.todos = [];
              vm.lists = [];
              vm.listId = 5;
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
