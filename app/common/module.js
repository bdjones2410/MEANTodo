(function() {
  'use strict';

    angular
      .module('mean-todo', [
        'ngRoute',
        'ngMessages',
        'satellizer',
        'ui.bootstrap'
      ])

    .config(['$routeProvider', function($routeProvider){
      $routeProvider
        .when('/', {
          templateUrl:
          'views/home.html',
          controller:'MainController as mainCTRL'
        })
        .when('/404', {
          templateUrl:'views/404.html'
        })
        .otherwise({
          redirectTo: '/404'
        });
    }]);
}());
