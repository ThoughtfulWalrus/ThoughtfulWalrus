angular.module('distress')
  .controller('HospitalCtrl', ['$scope', 'DataFetcher', 'GeoLocation',function ($scope, DataFetcher, GeoLocation) {
    $scope.init = function(){
      $scope.hospital();
    }

    //gets hospital station map
    $scope.hospital = function(){
      var location = {longitude: GeoLocation.longitude, latitude: GeoLocation.latitude};
      DataFetcher.getHospitalMap(location);
    }

    $scope.init();

  }]);