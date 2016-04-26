(function() {
  'use strict';
    angular
    .module('mean-todo')
    .controller('ModalInstanceCtrl', ['ModalService', '$scope', '$uibModalInstance',  function(ModalService, $scope, $uibModalInstance){

      var vm = this;

      vm.created = false;
        $scope.created = function(){
          return vm.created;
        };

        $scope.signup = function(user, pword){
          ModalService.signup(user, pword)
          .then(function(res){
            if(res.statusText){
              vm.created = true;
            }
          });
        };

        $scope.closeModal = function(){
          $uibModalInstance.close();
        };
    }]);

}());
