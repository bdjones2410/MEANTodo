(function() {
  'use strict';
    angular
      .module('mean-todo')
      .factory('mainService', function($http, $auth, $uibModal){

        //log in service
        var login = function(user, pword){
          var req = {
            uname: user,
            password: pword
          };
            return $auth.login(req).then(function(res){
              return populate();
          });
        };

        var populate = function(){
          var retObj = {};
          return getUser().then(function(res){
            return retObj.user = res;
          }).then(function(){
             return getAll().then(function(res){
               retObj.todos = res.data;
               return retObj;
             });
          });
        }

        var logout = function(){
          return $auth.logout();
        };

        var auth = function(){
          return $auth.isAuthenticated();
        };

        var getUser = function(){
          return $http.get('/auth/curUser').then(function(res){
            return res.data;
          });
        };

        var getAll = function(){
          return $http.get('/todo/getall')
          .success(function(res){
            return res;
          });
        };

        return {
          login:login,
          logout: logout,
          auth: auth,
          populate: populate
        };


      });



}());
