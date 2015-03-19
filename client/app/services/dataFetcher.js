angular.module('distress')
.factory('DataFetcher', ['MapMaker', 'EmergencyNumber', function(MapMaker, EmergencyNumber){
  var dataFetcher = {};

  dataFetcher.getPoliceMap = function(coords){
    MapMaker.createMap(coords, 'police');
  };

  dataFetcher.getHospitalMap = function(coords){
    MapMaker.createMap(coords, 'hospital');
  };

  dataFetcher.getEmergencyNumber = function(coords, callback){
    EmergencyNumber.getIt(coords, callback);
  };

  return dataFetcher;
}]);
