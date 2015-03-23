(function(){

  angular
    .module('distress')
    .controller('HomeCtrl', HomeCtrl);

  HomeCtrl.$inject = ['$scope', 'DistressButton', 'DataFetcher', 'GeoLocation', 'Auth'];

  function HomeCtrl($scope, DistressButton, DataFetcher, GeoLocation, Auth){
    $scope.emergencyNumber = DataFetcher.savedNumber || '';
    $scope.locationData = {};
    $scope.isLoggedIn = Auth.isAuthenticated();    
    // Display loading spinner and hide home content while ajax request is processing
    $scope.spinner = true;
    $scope.homeContent   = false;

    //assumes that getLocation has already been run.
    //passes location and callback to DataFetcher method, sets emergencyNumber on the DOM
    //using $apply (since it's asynchronous)
    //store it to Datafetcher.savedNumber so that it persists.
    $scope.getEmergencyNumber = function(){
      var self = this,
          location = {longitude: GeoLocation.longitude, latitude: GeoLocation.latitude};

      DataFetcher.getEmergencyNumber(location, function(emergencyNumber){
        self.$apply(function(){
          self.emergencyNumber = emergencyNumber;
          DataFetcher.savedNumber = emergencyNumber;          
          // When ajax request is complete, hide loading spinner and display home content.
          self.spinner = false;
          self.homeContent = true;
        });
      });
    };

    //function which uses the GeoLocation object to grab the geolocation
    //passes lat lon and callback, sets locationData on the DOM using $apply (since it's asynchronous)
    //calls getEmergencyNumber after the location has been found
    $scope.getLocation = function(){
      var self = this;

      GeoLocation.getLocation(function(lat, lon){
        self.$apply(function(){
          self.locationData = {latitude: lat, longitude: lon};
        });
        //once we get location data, we get emergency number
        self.getEmergencyNumber();
      });
    };

    $scope.sentMsgConf = false;
    $scope.distressBtn = true; 
    $scope.msgSpinner = false;

    //sends distress signal when the button is clicked
    $scope.distress = function(){
      var currentdate = new Date(); 
      var dateTime = (currentdate.getMonth()+1) + "/" + 
                      currentdate.getDate() + "/" +
                      currentdate.getFullYear() + " @ " +  
                      currentdate.getHours() + ":" +  
                      currentdate.getMinutes() + ":" + 
                      currentdate.getSeconds();

      $scope.distressBtn = false;
      $scope.msgSpinner = true;

      if ($scope.sentMsgConf) {
        $scope.sentMsgConf = false;
      }

      DistressButton.sendDistress(GeoLocation.longitude, 
                                  GeoLocation.latitude,
                                  GeoLocation.mapLink,
                                  dateTime)
        .then(function(){
          $scope.msgSpinner = false;
          $scope.sentMsgConf = true;
        });
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
})();
