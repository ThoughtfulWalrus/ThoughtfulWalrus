angular.module('distress')
.factory('GeoLocation', function(){
  var instance = {};

  instance.latitude = 0;
  instance.longitude = 0;
  instance.mapLink = '';

  /// Function: getLocation()
  /// Description: Retrieves the geolocation of browser, if supported.
  /// returns: Nothing.
  instance.getLocation = function(cb) {
    if (window.navigator && window.navigator.geolocation) {
       window.navigator.geolocation.getCurrentPosition(this.storeLocation.bind(this, cb));
       return true;
    } else {
      console.log('Error: Geolocation not supported');
      return false;
    }
  };

  /// Function: storeLocation()
  /// Description: Stores longitude, latitude, and google maps link to the window. takes callback
  /// returns: Nothing
  instance.storeLocation = function(cb, position) {
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
    this.mapLink = 'http://maps.google.com/?q=' + this.latitude + ',' + this.longitude;
    cb(this.latitude, this.longitude);
  };

  return instance;
});