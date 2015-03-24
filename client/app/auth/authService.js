(function(){

  angular
    .module('distress')
    .factory('Auth', Auth);

  Auth.$inject = ['$http', '$location', '$window'];

  function Auth($http, $location, $window){

    var instance = {
      signIn: signIn,
      signUp: signUp,
      logout: logout,
      isAuthenticated: isAuthenticated
    };

    return instance;

    ///// IMPLEMENTATION /////

    //sends a request to the /user/signin route of the server,
    //still need to see what the server will respond with
    function signIn(user){
      return $http({
        method: 'POST',
        url: '/user/signin',
        data: user
      }).then(function(response){
        return response;        
      });
    }

    //sends a request to the /user/signup route of the server,
    //still need to see what the server will respond with
    function signUp(user){
      return $http({
        method: 'POST',
        url: '/user/signup',
        data: user
      }).then(function(response){
        return response;
      });
    }
    
    //need to hookup to a button!
    function logout(){
      $window.localStorage.removeItem('distressAuth');
      $location.path('/');
    }

    function isAuthenticated(){
      return !!$window.localStorage.getItem('distressAuth');
    }
  }
})();