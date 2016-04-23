(function() {
  'use strict';
    angular
    .module('mean-todo')
    .controller('ModalInstanceCtrl', function($scope, $uibModalInstance, $auth, $http){
      var vm = this;
      vm.created = false;
        $scope.created = function(){
          return vm.created;
        };
        
        $scope.signup = function(){
          $auth.signup({
            uname: $scope.signupname,
            password: $scope.signuppass
          }).success(function(res){
            vm.created = true;
          });
        };

        $scope.closeModal = function(){
          $uibModalInstance.close();
        };
    });

}());
