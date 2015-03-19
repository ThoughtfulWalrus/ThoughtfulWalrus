angular.module('distress')
.factory('DataFetcher', ['MapMaker', 'EmergencyNumber', function(MapMaker, EmergencyNumber){
  var instance = {};

  instance.getPoliceMap = function(coords){
    MapMaker.createMap(coords, 'police');
  };

  instance.getHospitalMap = function(coords){
    MapMaker.createMap(coords, 'hospital');
  };

  instance.getEmergencyNumber = function(coords, callback){
    EmergencyNumber.getIt(coords, callback);
  };

  return instance;
}]);
