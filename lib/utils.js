/// Function: getLocation()
/// Description: Retrieves the geolocation of browser, if supported.   
/// returns: Nothing. 
var getLocation = function() {
  if (window.navigator && window.navigator.geolocation) {
     window.navigator.geolocation.getCurrentPosition(storeLocation);
  } else { 
    console.log('Error: Geolocation not supported');
  }
}

/// Function: storeLocation()
/// Description: Stores longitude and latitude to the window. 
/// returns: Nothing
var storeLocation = function(position) {
  window.latitude = position.coords.latitude;
  window.longitude = position.coords.longitude;  
}