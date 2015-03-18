angular.module('distress')
.factory('GeoLocation', function(){
    var obj = {
        // TODO: Please assign these to the client/app. That way, client can use it
        // to call other functions.
        latitude: 0,
        longitude: 0,
        mapLink: '',

        /// Function: getLocation()
        /// Description: Retrieves the geolocation of browser, if supported.
        /// returns: Nothing.
        getLocation: function(cb) {
          if (window.navigator && window.navigator.geolocation) {
             window.navigator.geolocation.getCurrentPosition(this.storeLocation.bind(this, cb));
             return true;
          } else {
            console.log('Error: Geolocation not supported');
            return false;
          }
        },

        /// Function: storeLocation()
        /// Description: Stores longitude, latitude, and google maps link to the window. takes callback
        /// returns: Nothing
        storeLocation: function(cb, position) {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.mapLink = 'http://maps.google.com/?q=' + this.latitude + ',' + this.longitude;
          cb(this.latitude, this.longitude);
        }
    };
    return obj;
});
