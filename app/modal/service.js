(function() {
  'use strict';
    angular
    .module('mean-todo')
      .factory('ModalService', ['$http', '$auth', function($http, $auth){

        var signup = function(user, pword){
          return $auth.signup({
            uname: user,
            password: pword
          })
          .catch(function(res){
            return res;
          });
        };

        return {
          signup: signup
        };

      }]);
}());
