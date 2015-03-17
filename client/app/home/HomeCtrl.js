angular.module('distress')
.controller('HomeCtrl', ['$scope', '$http', 'DistressButton', function($scope, $http, DistressButton){

  $scope.emergencyNumber = '';

  $scope.locationData = '';

  //initializing to anon.
  $scope.username = 'anon';

  //assumes that getLocation has already been run.
  //passes location and callback to dataFetcher method, sets emergencyNumber on the DOM
  //using $apply (since it's asynchronous)
  $scope.getEmergencyNumber = function(){
    var self = this;
    var location = {longitude: utils.longitude, latitude: utils.latitude};

    dataFetcher.getEmergencyNumber(location, function(emergencyNumber){
      this.$apply(function(){
        this.emergencyNumber = emergencyNumber
      }.bind(this));
    }.bind(self));
  };

  //function which uses the utils object to grab the geolocation
  //passes lat lon and callback, sets locationData on the DOM using $apply (since it's asynchronous)
  //calls getEmergencyNumber after the location has been found
  $scope.getLocation = function(){
    var self = this;
    utils.getLocation(function(lat, lon){
      this.$apply(function(){
        this.locationData = 'latitude: ' + lat + ' longitude: ' + lon;
      }.bind(this));
      //once we get location data, we get emergency number
      this.getEmergencyNumber()
    }.bind(self));
  };

  //sends distress signal when the button is clicked
  $scope.distress = function(){
    DistressButton.sendDistress($scope.username);
  }

  // initializes location and emergency number
  $scope.init = function(){
    $scope.getLocation();
  }
  $scope.init();
}]);

