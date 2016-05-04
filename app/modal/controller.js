(function() {
  'use strict';
    angular
    .module('mean-todo')
    .controller('ModalInstanceCtrl', ['ModalService', '$scope', '$uibModalInstance',  function(ModalService, $scope, $uibModalInstance){

      var vm = this;
      $scope.alerts = [];

      vm.created = false;
        $scope.created = function(){
          return vm.created;
        };

        $scope.signup = function(user, pword){
          if(vm.passwordsMatch()){
            ModalService.signup(user, pword)
            .then(function(res){
              if(res.statusText !== 'Conflict'){
                vm.created = true;
              }else{
                $scope.alerts.push(res.data);
              }
            });
          }else{
            $scope.alerts.push({message:"Be sure your password is entered correctly and confirmed"});
          }
        };

        $scope.closeAlert = function(index) {
          $scope.alerts.splice(index, 1);
        };

        vm.passwordsMatch = function(){
          if($scope.signuppass){
            return $scope.signuppass === $scope.confirmpass;
          }else{
            return false;
          }
        };

        $scope.noMatch = function(){
          if($scope.signuppass){
            return $scope.signuppass !== $scope.confirmpass;
          }
        };

        $scope.closeModal = function(){
          $uibModalInstance.close();
        };
    }]);

}());
