(function(){

  angular
    .module('distress')
    .controller('HospitalCtrl', HospitalCtrl);

  HospitalCtrl.$inject = ['$scope', 'DataFetcher', 'GeoLocation'];

  function HospitalCtrl($scope, DataFetcher, GeoLocation){
    $scope.init = function(){
      $scope.hospital();
    };

    //gets hospital station map
    $scope.hospital = function(){
      var location = {longitude: GeoLocation.longitude, latitude: GeoLocation.latitude};
      DataFetcher.getHospitalMap(location);
    };

    $scope.init();
  }
})();