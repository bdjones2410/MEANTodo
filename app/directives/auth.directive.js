(function() {
  'use strict';
      angular
        .module('mean-todo')
          .directive('userLogin', function(){
            return {
              restrict:'E',
              templateUrl: './views/auth.html',
              replace: false
            };
          });
}());
