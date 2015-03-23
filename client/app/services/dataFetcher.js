(function(){

  angular
    .module('distress')
    .factory('DataFetcher', DataFetcher);

  DataFetcher.$inject = ['MapMaker', 'EmergencyNumber'];

  function DataFetcher(MapMaker, EmergencyNumber){
    var instance = {
      getPoliceMap: getPoliceMap,
      getHospitalMap: getHospitalMap,
      getEmergencyNumber: getEmergencyNumber
    };

    return instance;

    ///// IMPLEMENTATION /////

    function getPoliceMap(coords){
      MapMaker.createMap(coords, 'police');
    }

    function getHospitalMap(coords){
      MapMaker.createMap(coords, 'hospital');
    }

    function getEmergencyNumber(coords, callback){
      EmergencyNumber.getIt(coords, callback);
    }
  }
})();