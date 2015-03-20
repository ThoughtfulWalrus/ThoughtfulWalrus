HomeCtrl.$inject = ['$scope', '$http', 'DistressButton', 'DataFetcher', 'GeoLocation']
angular.module('distress').controller('HomeCtrl', HomeCtrl);

function HomeCtrl($scope, $http, DistressButton, DataFetcher, GeoLocation){
  $scope.emergencyNumber = '';
  $scope.locationData = '';
  $scope.username = 'anon';

  //assumes that getLocation has already been run.
  //passes location and callback to DataFetcher method, sets emergencyNumber on the DOM
  //using $apply (since it's asynchronous)
  $scope.getEmergencyNumber = function(){
    var self = this;
    var location = {longitude: GeoLocation.longitude, latitude: GeoLocation.latitude};

    DataFetcher.getEmergencyNumber(location, function(emergencyNumber){
      this.$apply(function(){
        this.emergencyNumber = emergencyNumber;
      }.bind(this));
    }.bind(self));
  };

  //function which uses the GeoLocation object to grab the geolocation
  //passes lat lon and callback, sets locationData on the DOM using $apply (since it's asynchronous)
  //calls getEmergencyNumber after the location has been found
  $scope.getLocation = function(){
    var self = this;

    GeoLocation.getLocation(function(lat, lon){
      this.$apply(function(){
        this.locationData = 'latitude: ' + lat + ' longitude: ' + lon;
      }.bind(this));
      //once we get location data, we get emergency number
      this.getEmergencyNumber();
    }.bind(self));
  };

  //sends distress signal when the button is clicked
  $scope.distress = function(){
    DistressButton.sendDistress($scope.username);
  };

  //gets police station map
  $scope.police = function(){
    var location = {longitude: GeoLocation.longitude, latitude: GeoLocation.latitude};
    DataFetcher.getPoliceMap(location);
  };

  // initializes location and emergency number
  $scope.init = function(){
    $scope.getLocation();
  };
  $scope.init();
}