/// Function: getNumber(lat, lon)
/// lat,lon: coordinates formatted as floates
/// Description: Given location, return the phone number of the closest police station
/// Returns: String-formatted phone number
///
var dataFetcher = {};

dataFetcher.getEmergencyNumber = function(coords, callback){

  var data = {};

  var loc = new google.maps.LatLng(coords.latitude, coords.longitude);

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
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      var placeId = { placeId: results[0].place_id };

      service.getDetails(placeId, function(results, status){
        if (status === google.maps.places.PlacesServiceStatus.OK) {

          // Build data object:
          data.country = results.formatted_address.split(' ').slice(-1)[0];
          data.emergencyNumber = nums[data.country];
          data.policeNumber = results.formatted_phone_number;
          callback(data.emergencyNumber);
        }
      });
    }
  });
};



var nums = {"Algeria":"17","Angola":"113","Botswana":"911","Cameroon":"112","Chad":"17","Djibouti":"17","Egypt":"122","Ghana":"999","Mali":"17","Mauritius":"112","Morocco":"19","Nigeria":"112","Rwanda":"112","Sierra Leone":"019","Somalia":"888","South Africa":"10 111","Sudan":"999","Tunisia":"197","Uganda":"112","Zambia":"999","Zimbabwe":"999","Afghanistan":"119","Bahrain":"999","Bangladesh":"999","Burma":"999","Cambodia":"117","People's Republic of China":"110","East Timor":"112","Hong Kong":"999","India":"100","Indonesia":"110","Iran":"110","Israel":"100","Japan":"110","Jordan":"911","Kazakhstan":"112","Democratic People's Republic of Korea":"119","Republic of Korea":"112","Kuwait":"112","Lebanon":"112","Macau":"999","Maldives":"119","Malaysia":"999","Mongolia":"105","Nepal":"100","Oman":"999","Pakistan":"15","Philippines":"117","Qatar":"999","Saudi Arabia":"999","Singapore":"999","Sri Lanka":"119","Syria":"112","Republic of China (Taiwan)":"110","Tajikistan":"112","Thailand":"191","United Arab Emirates":"112","Vietnam":"113","Albania":"112","Andorra":"112","Armenia":"911","Austria":"112","Azerbaijan":"112","Belarus":"102","Belgium":"112","Bosnia and Herzegovina":"112","Bulgaria":"112","Croatia":"112","Cyprus":"112","Czech Republic":"112","Denmark":"112","Estonia":"112","Faroe Islands":"112","Finland":"112","France":"112","Georgia":"112","Germany":"112","Gibraltar":"112","Greece":"112","Greenland":"112","Hungary":"112","Iceland":"112","Republic of Ireland":"112","Italy":"112","Kosovo":"112","Latvia":"112","Lithuania":"112","Luxembourg":"112","Republic of Macedonia":"112","Malta":"112","Moldova":"902","Monaco":"112","Montenegro":"112","Netherlands":"112","Norway":"112","Poland":"112","Portugal":"112","Romania":"112","Russia":"112","San Marino":"113","Serbia":"192","Slovakia":"112","Slovenia":"112","Spain":"112","Sweden":"112","Switzerland":"112","Turkey":"112","Ukraine":"112","United Kingdom":"112","Vatican City":"113","Australia":"000","Fiji":"000","New Zealand":"111","Solomon Islands":"999","Vanuatu":"112","Canada":"911","Mexico":"066","Saint Pierre and Miquelon":"17","United States of America":"911","Barbados":"911","The Bahamas":"911","Cayman Islands":"911","Costa Rica":"911","Dominican Republic":"911","Guatemala":"110","El Salvador":"911","Haiti":"114","Honduras":"199","Jamaica":"119","Nicaragua":"911","Panama":"911","Trinidad and Tobago":"999","Argentina":"101","Bolivia":"110","Brazil":"190","Chile":"133","Colombia":"123","Ecuador":"911","French Guiana":"112","Guyana":"911","Paraguay":"911","Peru":"105","Suriname":"112","Uruguay":"911","Venezuela":"911"};
