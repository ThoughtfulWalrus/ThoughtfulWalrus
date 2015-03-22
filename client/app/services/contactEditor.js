angular.module('distress')

.factory('ContactEditor', function($http){
  var instance = {};

  instance.addContact = function(contact){
    return $http({
      method: 'POST',
      url: '/user/addContact',
      data: {contact: contact}
    });
  };

  instance.updateContact = function(contact){
    return $http({
      method: 'POST',
      url: '/user/updateContact',
      data: {contact: contact}
    });
  };

  instance.getContacts = function(contact){
    return $http({
      method: 'GET',
      url: '/user/getContacts'
    }).then(function (resp) {
      return resp.data;
    });;
  };
  return instance;
});
