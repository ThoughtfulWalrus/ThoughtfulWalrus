(function(){

  angular
    .module('distress')
    .factory('MapMaker', MapMaker);

  MapMaker.$inject = [];

  function MapMaker(){

    var instance = {
      createMap: createMap
    };

    return instance;

    ///// IMPLEMENTATION /////

    //creates a google map on the page
    function createMap(coords, type){
      var location = new google.maps.LatLng(coords.latitude,coords.longitude),
          div = document.getElementById(type),
          map = createGoogleMapDiv(div, {center: location, zoom: 15}),
          request = createGoogleRequest(location, 1000, type);

      setCenterMarker(location, map);
      googleServiceSearch(map, request);
    }

    ///// PRIVATE /////

    //creates the request for google
    function createGoogleRequest(location, radius, type){
      return {location: location, radius: radius, types: [type]};
    }

    //creates the map div on the page
    function createGoogleMapDiv(div, options){
      return new google.maps.Map(div, options);
    }

    //creates google places service for map
    function createGooglePlacesService(map){
      return new google.maps.places.PlacesService(map);
    }

    //searches nearby on the map, adds pins for the
    //type specified (police station, hospital, etc...)
    function googleServiceSearch(map, request){
      var service = createGooglePlacesService(map);
      service.nearbySearch(request, function(results, status){
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i], map, service);
          }
        }
      });
    }

    // Creates the center marker for the map
    function setCenterMarker(location, map) {
      var marker = new google.maps.Marker({
        position: location,
        map: map,
        icon: '../../img/person.png'
      });
    }

    //creates a marker for the map
    function createMarker(place, map, service) {
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
      });

      addMarkerClickListener(marker, map, service, place);
    }

    //creates a click listener for the marker,
    //which will show the name and phone number
    function addMarkerClickListener(marker, map, service, place){
      var infoWindow = new google.maps.InfoWindow();
      google.maps.event.addListener(marker, 'click', function() {
        service.getDetails(place, function(result, status) {
          if (status !== google.maps.places.PlacesServiceStatus.OK) {
            alert(status);
            return;
          }
          var contentString = '<div class="info" style="color: black">'+
            '<strong>' + result.name + '</strong><br>' +
            '<em>' + result.formatted_phone_number + '</em>';
          infoWindow.setContent(contentString);
          infoWindow.open(map, marker);
        });
      });
    }
  }
})();
