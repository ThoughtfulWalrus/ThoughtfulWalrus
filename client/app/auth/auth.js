angular.module('distress')

//creates a factory called 'Auth' which we can
//inject into our controllers
.factory('Auth', ['$http', '$location', '$window', function($http, $location, $window){
  var auth = {};

  //sends a request to the /user/signin route of the server,
  //still need to see what the server will respond with
  auth.signIn = function(user){
    return $http({
      method: 'POST',
      url: '/user/signin',
      data: user
    }).then(function(response){
      return response;
    });
  };

  //sends a request to the /user/signup route of the server,
  //still need to see what the server will respond with
  auth.signUp = function(user){
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
    $window.localStorage.removeItem('distressAuth');
    //add location path?
  };

  auth.isAuthenticated =  function(){
    return !!$window.localStorage.getItem('distressAuth');
  }

  return auth;
}])
