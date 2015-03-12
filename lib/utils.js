// Geo location functions
getLocation = function() {
  if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    console.log('Geolocatoin not working');
    }
  }

// getLocation callback
showPosition = function(position) {
  window.latitude = position.coords.latitude;
  window.longitude = position.coords.longitude;  
}