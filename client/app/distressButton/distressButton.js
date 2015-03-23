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
    function sendDistress(){
      $http({
        method: 'POST',
        url: '/sms/text/',
      }).then(function(response){
        return response;
      });
    }
  }
})();