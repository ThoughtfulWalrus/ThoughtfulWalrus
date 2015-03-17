angular.module('distress')
.factory('Auth', function($http, $location){
  var auth = {};

  auth.signin = function(user){
    return $http({
      method: 'GET',
      url: '/user/signin',
      data: user
    }).then(function(response){
      return response;
    });
  };

  auth.signup = function(user){
    return $http({
      method: 'POST',
      url: '/user/signup',
      data: user
    }).then(function(response){
      return response;
    });
  };

  auth.logout = function(){
    $location.path = '/signin'
  };

  return auth;
});