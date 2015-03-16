angular.module('distress')
.controller('HomeCtrl', ['$scope', function($scope){
  $scope.number = 'placeholder for emergency number';
  $scope.locationData = 'placeholder for location';
  $scope.getEmergencyNumber = function(){
  };
  $scope.setEmergencyNumber = function(){
  };
  $scope.getLocation = function(){
    var self = this;
    utils.getLocation(function(lat, lon){
      this.locationData = 'latitude: ' + lat + ' longitude: ' + lon;
    }.bind(self));
  }
}]);

