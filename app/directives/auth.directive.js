(function() {
  'use strict';
      angular
        .module('mean-todo')
          .directive('userLogin', ['mainService', function(mainService){
            return {
              restrict:'E',
              templateUrl: './views/auth.html',
              replace: false,
              controller: 'MainController'
            };
          }]
        );
}());
