angular.module('distress')
  .controller('PoliceCtrl', ['$scope', 'DataFetcher', 'GeoLocation',function ($scope, DataFetcher, GeoLocation) {
    $scope.init = function(){
      $scope.police();
    }

    //gets police station map
    $scope.police = function(){
      var location = {longitude: GeoLocation.longitude, latitude: GeoLocation.latitude};
      DataFetcher.getPoliceMap(location);
    }

    $scope.init();

  }]);