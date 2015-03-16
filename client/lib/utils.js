var utils = (function() {
    var obj = {

        // TODO: Please assign these to the client/app. That way, client can use it
        // to call other functions.
        latitude: 0,
        longitude: 0,

        /// Function: getLocation()
        /// Description: Retrieves the geolocation of browser, if supported.
        /// returns: Nothing.
        getLocation: function(cb) {
          if (window.navigator && window.navigator.geolocation) {
             window.navigator.geolocation.getCurrentPosition(this.storeLocation.bind(utils, cb));
             return true;
          } else {
            console.log('Error: Geolocation not supported');
            return false;
          }
        },

        /// Function: storeLocation()
        /// Description: Stores longitude and latitude to the window.
        /// returns: Nothing
        storeLocation: function(cb, position) {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          cb(this.latitude, this.longitude);
        }
    };
    return obj;
}());