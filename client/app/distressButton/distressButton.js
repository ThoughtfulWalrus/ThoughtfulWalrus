(function(){

  angular
    .module('distress')
    .factory('DistressButton', DistressButton);

  DistressButton.$inject = ['$http'];

  function DistressButton($http){

    var instance = {
      sendDistress: sendDistress
    };

    return instance;

    ///// IMPLEMENTATION /////

    //sends username to server, which will grab
    //the contactList from the database and send the
    //messages.
    function sendDistress(latitude, longitude, mapLink, dateTime){
      $http({
        method: 'POST',
        url: '/sms/text/',
        data: {latitude: latitude, 
               longitude: longitude, 
               mapLink: mapLink, 
               timeOfDistress: dateTime}
      }).then(function(response){
        return response;
      });
    }
  }
})();