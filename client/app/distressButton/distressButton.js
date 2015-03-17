angular.module('distress')

//creates a factory called 'DistressButton' which we can
//inject into our controllers
.factory('DistressButton', function($http){
  var instance = {};

  //method sends username to server, which will grab
  //the contactList from the database and send the
  //messages.
  instance.sendDistress = function(username){
    $http({
      method: 'POST',
      url: '/sms/text/',
      data: username
    }).then(function(response){
      return response;
    });
  };

  return instance;
});