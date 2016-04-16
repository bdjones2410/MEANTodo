(function() {
  'use strict';
    angular
      .module('mean-todo')
      .factory('mainService', function($http, $auth){

        var logmein = function(){};


        return {
          logmein:logmein
        };


      });



}());
