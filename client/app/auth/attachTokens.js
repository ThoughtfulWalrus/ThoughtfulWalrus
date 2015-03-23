(function(){

  angular
    .module('distress')
    .factory('AttachTokens', AttachTokens);

  AttachTokens.$inject = ['$window'];

  function AttachTokens ($window) {

    var instance = {
      request: request
    };

    return instance;

    ///// IMPLEMENTATION /////

    // this is an $httpInterceptor
    // its job is to stop all out going request
    // then look in local storage and find the user's token
    // then add it to the header so the server can validate the request
    function request (object) {
      var jwt = $window.localStorage.getItem('distressAuth');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  }
})();