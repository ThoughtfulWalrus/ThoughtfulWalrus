var utils = (function() {
    var obj = {

        // TODO: Please assign these to the client/app. That way, client can use it
        // to call other functions. 
        latitude: 0,
        longitude: 0,

        /// Function: getLocation()
        /// Description: Retrieves the geolocation of browser, if supported.   
        /// returns: Nothing. 
        getLocation: function() {
          if (window.navigator && window.navigator.geolocation) {
             window.navigator.geolocation.getCurrentPosition(this.storeLocation);
             return true;
          } else { 
            console.log('Error: Geolocation not supported');
            return false;
          }
        },

        /// Function: storeLocation()
        /// Description: Stores longitude and latitude to the window. 
        /// returns: Nothing
        storeLocation: function(position) {
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;  
        }
    }
    return obj;
}());