angular.module('distress')
.controller('HomeCtrl', ['$scope', function($scope){

  $scope.emergencyNumber = 'placeholder for emergency number';

  $scope.locationData = 'placeholder for location';

  //function which uses the dataFetcher object to grab the emergency number
  //assumes that getLocation has already been run.
  //passes location and callback to dataFetcher method, sets emergencyNumber on the DOM
  $scope.getEmergencyNumber = function(){
    var self = this;
    var location = {longitude: utils.longitude, latitude: utils.latitude};
    dataFetcher.getEmergencyNumber(location, function(emergencyNumber){
      self.emergencyNumber = emergencyNumber;
    }.bind(self));
  };

  //function which uses the utils object to grab the geolocation
  //passes lat lon and callback, sets locationData on the DOM
  $scope.getLocation = function(){
    var self = this;
    utils.getLocation(function(lat, lon){
      this.locationData = 'latitude: ' + lat + ' longitude: ' + lon;
    }.bind(self));
  };

}]);

