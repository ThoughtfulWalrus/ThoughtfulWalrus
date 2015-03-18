angular.module('distress')

//creates a factory called 'Auth' which we can
//inject into our controllers
.factory('Auth', function($http, $location){
  var auth = {};

  //sends a request to the /user/signin route of the server,
  //still need to see what the server will respond with
  auth.signin = function(user){
    return $http({
      method: 'GET',
      url: '/user/signin',
      data: user
    }).then(function(response){
      return response;
    });
  };

  //sends a request to the /user/signup route of the server,
  //still need to see what the server will respond with
  auth.signup = function(user){
    return $http({
      method: 'POST',
      url: '/user/signup',
      data: user
    }).then(function(response){
      return response;
    });
  };

  //needs to delete token/remove cookie/undo however we do authentication.
  auth.logout = function(){
    $location.path = '/signin'
    //TODO
  };

  return auth;
});