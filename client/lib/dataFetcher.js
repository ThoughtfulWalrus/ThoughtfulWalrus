/// Function: getNumber(lat, lon)
/// lat,lon: coordinates formatted as floates
/// Description: Given location, return the phone number of the closest police station
/// Returns: String-formatted phone number
var getNumber = function(lat, lon){

  var loc = new google.maps.LatLng(lat, lon);

  var request = {
    location: loc,
    radius: '1000',
    types: ['police']
  };

  // Google TOS requires us to render attributions.  In fact, the PlacesService method requires a DOM node for exactly that purpose.  That's what #myDiv is for.  If we are going to use a map we'll need to pass the map element instead.
  service = new google.maps.places.PlacesService($('#myDiv').get(0));

  // Initial nearbySearch call returns object contatining place_id
    // required parameter for nested getDetails call
  service.nearbySearch(request, function(results, status){
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      var placeId = { placeId: results[0].place_id };

      service.getDetails(placeId, function(results, status){
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          console.log('HELP MEEEEEE!', results.formatted_phone_number);
        }
      });
    }
  });
};
