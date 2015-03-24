(function(){

  angular
    .module('distress')
    .factory('GeoLocation', GeoLocation);

  GeoLocation.$inject = [];

  function GeoLocation(){

    var instance = {
      latitude: 0,
      longitude: 0,
      mapLink: '',
      getLocation: getLocation,
      storeLocation: storeLocation
    };

    return instance;

    ///// IMPLEMENTATION /////

    /// Description: Retrieves the geolocation of browser, if supported.
    /// returns: Nothing.
    function getLocation(cb) {
      if (window.navigator && window.navigator.geolocation) {
         window.navigator.geolocation.getCurrentPosition(this.storeLocation.bind(this, cb));
         return true;
      } else {
        console.log('Error: Geolocation not supported');
        return false;
      }
    }

    /// Description: Stores longitude, latitude, and google maps link to the window. takes callback
    /// returns: Nothing
    function storeLocation(cb, position) {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.mapLink = 'http://maps.google.com/?q=' + this.latitude + ',' + this.longitude;
      cb(this.latitude, this.longitude);
    }
  }
})();