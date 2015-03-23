(function(){

  angular
    .module('distress')
    .controller('PoliceCtrl', PoliceCtrl);

  PoliceCtrl.$inject = ['$scope', 'DataFetcher', 'GeoLocation' ];

  function PoliceCtrl ($scope, DataFetcher, GeoLocation) {
    $scope.init = function(){
      $scope.police();
    };

    //gets police station map
    $scope.police = function(){
      var location = {longitude: GeoLocation.longitude, latitude: GeoLocation.latitude};
      DataFetcher.getPoliceMap(location);
    };

    $scope.init();
  }
})();